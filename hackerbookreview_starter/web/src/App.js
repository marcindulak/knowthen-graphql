import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Home';
import Book from './Book';
import AddBook from './AddBook';
import BookReview from './BookReview';

const App = props => (
  <Router>
    <div className="mw8 center avenir">
      <Header {...props} />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/book/:id/review" component={BookReview} />
        <Route exact path="/book/:id" component={Book} />
        <Route exact path="/add" component={AddBook} />
      </Routes>
      <Footer {...props} />
    </div>
  </Router>
);

export default App;
