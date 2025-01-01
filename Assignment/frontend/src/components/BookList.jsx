import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = ({ query }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3002/api/books?q=${query}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
      setIsLoading(false);
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="book-list p-8 bg-[#E7E6E6] "
    style={{
      background: 'radial-gradient(50% 50% at 50% 50%, #F2CBCB 0%, #D8CDCD 47.5%, #E7E6E6 86%)',
    }}
    >
      {isLoading ? (
        <p className="text-center text-xl font-semibold text-gray-700">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books?.map((book) => (
            <div
              key={book.id}
              className="group bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder.png'}
                alt={book.volumeInfo.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600">
                  {book.volumeInfo.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
                </p>
                <p className="text-sm text-gray-500">
                  {book.volumeInfo.publishedDate || 'Unknown Date'}
                </p>
                <a
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-full transition duration-300"
                >
                  More Info
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      {books.length === 0 && !isLoading && (
        <p className="text-center text-lg text-gray-600 mt-8">
          No books found. Try a different search query.
        </p>
      )}
    </div>
  );
};

export default BookList;