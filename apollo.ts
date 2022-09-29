import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: "https://quick-chicken-sleep-211-248-105-54.loca.lt/graphql",
  cache: new InMemoryCache(),
});

export default client;
