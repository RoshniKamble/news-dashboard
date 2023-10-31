import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import NewsList from './NewsList';
import CategoryFilter from './CategoryFilter';
import SearchFilter from './SearchFilter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      selectedCategory: 'all',
      searchQuery: '',
      isSidebarOpen: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://linesnews.onrender.com/api/news-datas');
      const newsData = response.data.data;

      this.setState({ newsData });
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  }

  // Function to toggle the sidebar
  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  // Function to handle category filter change
  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category });
  };

  // Function to handle search filter change
  handleSearchChange = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    const { newsData, selectedCategory, searchQuery, isSidebarOpen } = this.state;
    const sidebarClass = isSidebarOpen ? 'sidebar open' : 'sidebar';

    const filteredNews = newsData.filter((news) => {
      const selectedCategoryLower = selectedCategory.toLowerCase();
      const newsCategoryLower = news.attributes.category.toLowerCase();
      return (
        (selectedCategoryLower === 'all' || newsCategoryLower === selectedCategoryLower) &&
        (news.attributes.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.attributes.hashtags.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });

    return (
      <div className="App">
        <button className="toggle-button" onClick={this.toggleSidebar}>
          ☰
        </button>
        <div className={sidebarClass}>
          <h3>News Dashboard</h3>
          {/* Sidebar content goes here */}
          <ul>
            <li>
              <a href="#">
                <span class="icon"><i class="fas fa-home"></i></span>
                <span class="title">Home</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon"><i class="far fa-address-book"></i></span>
                <span class="title">About</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon"><i class="fas fa-cog"></i></span>
                <span class="title">Services</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon"><i class="fas fa-user"></i></span>
                <span class="title">Contact</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="content main-content">
          <div className="navbar">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={this.handleCategoryChange}
            />
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={this.handleSearchChange}
            />
          </div>
          <NewsList newsData={filteredNews} />
        </div>
      </div>
    );
  }
}

export default App;
