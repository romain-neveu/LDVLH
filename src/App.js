import React from 'react';
import logo from './logo.svg';
import story from './books/ronin_malgre_vous.json';
import Book from './book.js';
import './App.css';

function App() {
  return (
    <div className="App">    
      <Book book={story} />
    </div>
  );
}

export default App;
