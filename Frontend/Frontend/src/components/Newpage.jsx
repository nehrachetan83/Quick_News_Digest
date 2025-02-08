import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function NewsPage() {
  const { category } = useParams(); // Get the category from the URL
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/news/${category}`, {
          credentials: 'include', // Include cookies for secure requests
        });
        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
        } else {
          console.error('Failed to fetch news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-white mb-6 capitalize">{category} News</h1>
      {loading && <p className="text-center text-white">Loading...</p>}
      {!loading && newsData.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {newsData.map((news, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Ensure full image display */}
              <img
                src={news.image_url || 'https://via.placeholder.com/300x200'}
                alt={news.title}
                className="w-full h-56 object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">{news.title}</h2>
                <p className="text-md text-gray-300 mb-6">{news.summary}</p>
                {/* Button with background-matching color and hover effects */}
                <button
                  onClick={() => window.open(news.link, '_blank')}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
                >
                  Read More on Source
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && newsData.length === 0 && (
        <p className="text-center text-white">No news available for {category}</p>
      )}
    </div>
  );
}

export default NewsPage;
