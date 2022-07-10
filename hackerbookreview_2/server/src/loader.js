import { findAuthorsByBookIdsLoader } from './author.js';
import { findBooksByIdsLoader } from './book.js';

export default () => ({
  findAuthorsByBookIdsLoader: findAuthorsByBookIdsLoader(),
  findBooksByIdsLoader: findBooksByIdsLoader(),
});
