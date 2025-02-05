import React from 'react';

function HomePage() {
  return (
    <div className="home-container bg-white">
      {/* Hero Section */}
      <section className="section hero bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Welcome to Quick News Digest
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Get your daily dose of news summarized in 60 words or less, powered by AI. Stay informed on the latest updates across categories like Sports, Technology, Politics, and more.
          </p>
          <p className="text-md md:text-lg text-gray-300 mb-6">
            Whether it's global events, trending stories, or niche topics, Quick News Digest delivers the news that matters to you, simply and concisely.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories py-16 bg-white text-gray-900">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            Latest News Categories
          </h2>
          
          {/* News Items */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-transparent hover:border-gray-600 rounded-3xl shadow-xl p-6 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">Sports</h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-300">
                  Dive into the exciting world of sports, from the latest matches and tournaments to player performances. Our AI curates the most important sporting news in under 60 words. Be it football, basketball, cricket, or tennis, get quick updates that keep you in the loop.
                </p>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-transparent hover:border-gray-600 rounded-3xl shadow-xl p-6 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">Technology</h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-300">
                  Stay ahead of the curve with the latest tech innovations. From AI breakthroughs to gadget launches, we provide you with concise and informative summaries of everything tech-related. Our AI-powered tools extract the most relevant news to keep you updated on the ever-evolving tech world.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-transparent hover:border-gray-600 rounded-3xl shadow-xl p-6 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">Politics</h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-300">
                  Get informed about the latest political happenings globally. Whether it's election results, policy changes, or international relations, we summarize everything you need to know in a few words. Political shifts can impact economies, and we make sure you're always in the loop.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-transparent hover:border-gray-600 rounded-3xl shadow-xl p-6 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">Education</h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-300">
                  Stay updated on the evolving world of education, from research breakthroughs to the latest trends in online learning and academic developments that matter to you. Education is a key pillar of progress, and we ensure you're always well-informed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section how-it-works py-16 bg-white text-gray-900">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">
            How Quick News Digest Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-transparent hover:border-gray-600 rounded-3xl shadow-xl p-6 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">AI-Powered Summaries</h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-300">
                  Our AI technology quickly processes news from trusted sources and generates concise summaries. Get the highlights you need in a matter of seconds, saving you time and effort. Our system learns your preferences to provide you with more personalized news summaries.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-transparent hover:border-gray-600 rounded-3xl shadow-xl p-6 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">Custom Categories</h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-300">
                  Choose your preferred categories, such as Sports, Technology, Business, and more. We tailor news for you based on your interests, ensuring you only get the most relevant updates. Get news that aligns with your passions, all summarized efficiently.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-transparent hover:border-gray-600 rounded-3xl shadow-xl p-6 mb-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="w-full md:w-1/3 mb-4 md:mb-0">
                <h3 className="text-2xl font-semibold mb-3">Simple Interface</h3>
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg text-gray-300">
                  With a sleek, minimalist design, navigating Quick News Digest is easy. No distractions, just the news that matters to you, delivered in an effortlessly digestible format. We focus on simplicity to provide a seamless reading experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section cta py-16 bg-white text-gray-900">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Get Started with Quick News Digest
          </h2>
          <p className="text-lg mb-6">
            Stay on top of world events, keep up with your interests, and never miss an important update. Sign up now to receive personalized news summaries every day. Join us and make the news digestible.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
