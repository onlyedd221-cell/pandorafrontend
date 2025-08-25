'use client'
import { ApolloProvider } from "@apollo/client/react";
import WelcomePage from "./welcome/page";
import client from "../lib/apolloClient";
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <WelcomePage />
    </ApolloProvider>
  );
}
