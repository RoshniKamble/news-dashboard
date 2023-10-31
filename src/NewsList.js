import React from 'react';
import NewsArticle from './NewsArticle';

const NewsList = ({ newsData }) => {
  return (
    <div className="news-list">
      {newsData.map((news, index) => (
        <NewsArticle key={index} news={news.attributes} /> /* Access attributes */
      ))}
    </div>
  );
};

export default NewsList;
