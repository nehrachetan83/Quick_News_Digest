import requests
import schedule
import time
from datetime import datetime, timedelta, timezone
from bs4 import BeautifulSoup
from transformers import pipeline
from supabase import create_client
from dateutil import parser
import cloudinary.uploader
from dotenv import load_dotenv
load_dotenv()
import os
# --- Supabase Setup ---
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")


cloudinary.config(
    cloud_name=os.getenv("cloud_name"),
    api_key=os.getenv("api_key"),
    api_secret=os.getenv("api_secret")
)
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- RSS Feeds ---
RSS_FEEDS = {
    "top_stories": "http://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    "india": "http://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
    "sports": "http://timesofindia.indiatimes.com/rssfeeds/4719148.cms",
    "tech": "http://timesofindia.indiatimes.com/rssfeeds/66949542.cms",
    "education": "http://timesofindia.indiatimes.com/rssfeeds/913168846.cms"
}

# --- Hugging Face Summarizer ---
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", device=-1)  # Use CPU

# --- Fetch and Store News ---
def fetch_and_store_news(max_items=40):
    for category, feed_url in RSS_FEEDS.items():
        print(f"Fetching news for category: {category}")
        try:
            response = requests.get(feed_url, timeout=10)
            response.raise_for_status()
        except requests.RequestException as e:
            print(f"Error fetching RSS feed for {category}: {e}")
            continue

        soup = BeautifulSoup(response.content, "xml")
        items = soup.find_all("item")[:max_items]  # Fetch up to max_items

        for item in items:
            title = item.find("title").text.strip()
            link = item.find("link").text.strip()
            image_url = upload_to_cloudinary(item.find("enclosure")["url"]) if item.find("enclosure") else None
            pub_date = item.find("pubDate").text if item.find("pubDate") else datetime.now(timezone.utc).isoformat()

            if is_news_duplicate(category, link):
                print(f"Duplicate news skipped: {title}")
                continue

            news_content = scrape_full_news(link)
            if not news_content:
                print(f"Skipping news without valid content: {title}")
                continue

            summary = summarize_news(news_content)

            store_news_in_db(category, title, link, image_url, summary, pub_date)

    delete_old_news()

# --- Upload Image to Cloudinary ---
def upload_to_cloudinary(image_url):
    try:
        upload_result = cloudinary.uploader.upload(image_url)
        return upload_result.get("url")
    except Exception as e:
        print(f"Error uploading image to Cloudinary: {e}")
        return "https://via.placeholder.com/150"  # Fallback URL

# --- Check for Duplicate News ---
def is_news_duplicate(category, link):
    try:
        response = supabase.table(category).select("id").eq("link", link).execute()
        return len(response.data) > 0
    except Exception as e:
        print(f"Error checking duplicate news: {e}")
        return False

# --- Scrape Full News Content ---
def scrape_full_news(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        # Update the class for scraping content if necessary
        content_div = soup.find("div", {"class": "_s30J clearfix"})
        if not content_div:
            return None

        return extract_text_recursive(content_div).strip()
    except Exception as e:
        print(f"Error scraping content from {url}: {e}")
        return None

# --- Summarize News Content ---
def summarize_news(content):
    try:
        # Adjust input to avoid GPU memory errors
        content = content[:1024]  # Limit input size for summarization
        summary = summarizer(content, max_length=200, min_length=50, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        print(f"Error summarizing content: {e}")
        return content[:200]  # Return a fallback truncated summary

# --- Store News in Supabase ---
def store_news_in_db(category, title, link, image_url, summary, pub_date):
    try:
        pub_date_dt = parser.parse(pub_date).isoformat()
        supabase.table(category).insert({
            "title": title,
            "link": link,
            "image_url": image_url or "https://via.placeholder.com/150",  # Fallback for image_url
            "summary": summary,
            "pub_date": pub_date_dt,
            "created_at": datetime.now(timezone.utc).isoformat()
        }).execute()
        print(f"News stored in {category}: {title}")
    except Exception as e:
        print(f"Error inserting news into {category}: {e}")

# --- Delete News Older Than 2 Days ---
def delete_old_news():
    try:
        two_days_ago = (datetime.now(timezone.utc) - timedelta(days=2)).isoformat()
        for category in RSS_FEEDS.keys():
            supabase.table(category).delete().lt("created_at", two_days_ago).execute()
            print(f"Deleted old news from {category}")
    except Exception as e:
        print(f"Error deleting old news: {e}")

# --- Extract Text Recursively ---
def extract_text_recursive(tag):
    if not tag:
        return ""
    if tag.name in ["script", "style"]:
        return ""
    if tag.string:
        return tag.string.strip()
    return " ".join(extract_text_recursive(child) for child in tag.children if child)

# --- Scheduler for Production ---
# def run_scheduler():
#     schedule.every(6).hours.do(fetch_and_store_news)  # Run every 2 hours
#     print("Production scheduler started. Press Ctrl+C to stop.")
#     fetch_and_store_news()  # Run immediately on startup
#     while True:
#         schedule.run_pending()
#         time.sleep(60)

# # --- Scheduler for Testing ---
# def run_test_scheduler():
#     schedule.every(5).minutes.do(lambda: fetch_and_store_news(max_items=5))  # Run every 5 minutes with fewer items
#     print("Test scheduler started. Press Ctrl+C to stop.")
#     fetch_and_store_news(max_items=5)  # Run immediately on startup
#     while True:
#         schedule.run_pending()
#         time.sleep(60)

# --- Main ---
if __name__ == "__main__":
    fetch_and_store_news()
    # try:
        # Uncomment the scheduler you want to use
        # run_scheduler()  # Fo/r production
    #     run_test_scheduler()  # For testing
    # except KeyboardInterrupt:
    #     print("Scheduler stopped.")