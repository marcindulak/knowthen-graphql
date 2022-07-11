import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/book/:id/review" element={<BookReview/>} />
        <Route exact path="/book/:id" element={<Book/>} />
        <Route exact path="/add" element={<AddBook/>} />
      </Switch>
      <Footer {...props} />
    </div>
  </Router>
);

export default App;
