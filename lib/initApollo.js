import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-fetch';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

const link = createUploadLink({
  uri: 'http://localhost:5000/graphql',
  credentials: 'same-origin'
});

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
        }
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      withClientState({
        defaults: {
          newComment: {
            id: -1,
            author: null,
            complete: null,
            updated_at: null,
            location: '',
            replies: [],
            content: '',
            x: 0,
            y: 0,
            __typename: 'NewComment'
          }
        },
        resolvers: {
          Mutation: {
            addComment: (_, { addComment }, { cache }) => {
              cache.writeData({ data: { addComment } });
              return null;
            }
          }
        }
      }),
      link
    ]),
    cache: new InMemoryCache().restore(initialState || {}),
    ssrMode: !process.browser
  });

  // return new ApolloClient({
  //   uri: 'http://localhost:5000/graphql',
  //   clientState: {
  //     defaults: {
  //       newComment: {
  //         id: -1,
  //         author: null,
  //         complete: null,
  //         updated_at: null,
  //         location: '',
  //         replies: [],
  //         content: '',
  //         x: 0,
  //         y: 0,
  //         __typename: 'NewComment'
  //       }
  //     }
  //   }
  // connectToDevTools: true,
  // ssrMode: !process.browser
  // Disables forceFetch on the server (so queries are only run once)
  // link: new HttpLink({
  // uri: "http://localhost:5000/graphql", // Server URL (must be absolute)
  // credentials: "same-origin"
  // Additional fetch() options like `credentials` or `headers`
  // }),
  // cache: new InMemoryCache().restore(initialState || {})
  // });
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
