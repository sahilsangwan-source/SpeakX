import { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionList from './Components/QuestionList';
import Pagination from './Components/Pagination';
import Sidebar from './Components/Sidebar';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ type: '', title: '' });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions', {
          params: {
            page: currentPage,
            type: filters.type,
            title: filters.title,
          },
        });
        setQuestions(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.pageSize));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [currentPage, filters]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <Sidebar onSearch={handleSearch} />
      </div>
      <div className="right-section">
        <div className="question-list-container">
          <QuestionList questions={questions} />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;