"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";

// HTTP link
const httpLink = new HttpLink({
  uri: "https://pandorabackend-7e67.onrender.com/graphql",
});

// Auth link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token"); // get the stored token
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // combine auth and http links
  cache: new InMemoryCache(),
});

export default function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
