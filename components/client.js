import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import * as fetch from "isomorphic-fetch";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  fetch
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
