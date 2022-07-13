// TODO: add custom GraphQL client "library"
import graphqlFetch from './lib/graphqlFetch';

const url = 'http://server:4000/graphql';

export default graphqlFetch(url);
