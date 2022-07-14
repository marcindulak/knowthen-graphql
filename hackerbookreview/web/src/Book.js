import React, { Component } from 'react';
import * as R from 'ramda';
import { BookDetail } from './components/Book';
import { BookDetailReviews } from './components/Book';
import Error from './components/Error';
import data from './data';
import fetch from './fetch';

// https://reactrouter.com/docs/en/v6/getting-started/faq#what-happened-to-withrouter-i-need-it
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const findBookById = (id, books) => R.find(R.propEq('id', id), books);

const query = `
fragment Book on Book {
  id
  title
  description
  imageUrl
  rating
}

fragment Review on Review {
  id
  title
  rating
  comment
  user {
    name
    imageUrl
  }
}

query Book($id: ID!) {
  book(id: $id) {
    ...Book
    reviews {
      ...Review
    }
    authors {
      name
    }
  }
}

`;

class Book extends Component {
  state = {
    book: null,
    errors: [],
  };
  // Prevent double fetch in componentDidMount
  // https://stackoverflow.com/questions/71755119/reactjs-componentdidmount-executes-twice/71755316#71755316
  // https://github.com/facebook/react/issues/24502
  execute = true;
  async componentDidMount() {
    if (!this.execute) {
      return;
    }
    this.execute = false;
    const id = R.path(['props', 'router', 'params', 'id'], this);
    try {
      // TODO: fetch actual book using graphql
      const variables = { id };
      const result = await fetch({ query, variables });
      const book = R.path(['data', 'book'], result);
      const errorList = R.pathOr([], ['errors'], result);
      const errors = R.map(error => error.message, errorList);
      this.setState({ book, errors });
    } catch (err) {
      this.setState({ errors: [err.message] });
    }
  }
  render() {
    const { book } = this.state;
    if (!book) return null;
    const reviews = R.pathOr([], ['state', 'book', 'reviews'], this);

    return (
      <div className="cf black-80 mv2">
        <Error errors={this.state.errors} />
        <BookDetail book={book} />
        <BookDetailReviews bookId={book.id} reviews={reviews} />
      </div>
    );
  }
}

export default withRouter(Book);
