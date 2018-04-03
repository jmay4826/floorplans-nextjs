import ApolloClient, { HttpLink, InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-fetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  return new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    clientState: {
      defaults: {
        newComment: {
          id: Math.random().toString(),
          author: null,
          complete: null,
          updated_at: null,
          location: 'D105',
          replies: [],
          content: 'Default',
          x: 100,
          y: 100,
          __typename: 'NewComment'
        }
      }
    }
    // connectToDevTools: true,
    // ssrMode: !process.browser // Disables forceFetch on the server (so queries are only run once)
    // link: new HttpLink({
    // uri: "http://localhost:5000/graphql", // Server URL (must be absolute)
    // credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
    // }),
    // cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
