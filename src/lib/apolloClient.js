// // import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri: process.env.NEXT_PUBLIC_GRAPHQL_URL, // Your backend GraphQL endpoint
//   }),
//   cache: new InMemoryCache(),
// });

// export default client;
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // replace with your backend endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
