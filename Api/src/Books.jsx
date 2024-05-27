

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css'; 

const Books = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then(response => {
      setBooks(response.data.books);
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setError('Data not found');
      } else {
        setError('An error occurred');
      }
      console.error(error);
    });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.id} className="book-item">
          <div className="book-left">
            <h2>{book.title}</h2>
            <img src={book.imageLinks.thumbnail} alt={book.title} className="book-image" />
            <p className="book-authors">{book.authors.join(', ')}</p>
          </div>
          <div className="book-right">
            <p>{book.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
