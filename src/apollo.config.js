import {ApolloClient, InMemoryCache} from '@apollo/client';

// const client = new ApolloClient({
//   url: 'http://107.21.161.82:5000',
//   cache: new InMemoryCache(),
// });

module.exports = {
  client: {
    service: {
      url: 'http://107.21.161.82:5000/graphql',
      skipSSLValidation: true,
    },
  },
};
