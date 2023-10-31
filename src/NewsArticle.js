import React from 'react';

const NewsArticle = ({ news }) => {
  return (
    <div className="news-article">
      <h2>{news.headline}</h2>
      <img class="img-fluid" src={news.newsIcon} alt="News Icon" />
      <p>Source: {news.newsSource}</p>
      <p>Hashtags: {news.hashtags}</p>
      <p>Category: {news.category}</p>
      <a href="https://www.google.com">Read more <i class="fas fa-arrow-right"></i></a>
    </div>
  );
};

export default NewsArticle;
