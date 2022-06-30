import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { GQLEndpoint } from "../constants";

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (networkError) {
    console.log(networkError);
  }
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(
        "GQL ERROR | Operation:",
        operation.operationName,
        "| Variables:",
        operation.variables,
        "| Error response:",
        err
      );
    }
  }
});

const getAuthHeader = async () => {
  const token = await window.localStorage.getItem("jwt");
  if (token !== null) {
    return { "X-Authorization": "Bearer " + token };
  } else {
    return;
  }
};

const authLink = setContext(async (_, { headers }) => {
  const authHeaders = await getAuthHeader();
  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

export const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    new HttpLink({
      uri: GQLEndpoint,
    }),
  ]),

  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "none",
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    },
    query: {
      errorPolicy: "none",
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      errorPolicy: "none",
    },
  },
});

export const ssrClient = new ApolloClient({
  link: from([
    errorLink,
    new HttpLink({
      uri: GQLEndpoint,
    }),
  ]),

  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "none",
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    },
    query: {
      errorPolicy: "none",
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      errorPolicy: "none",
    },
  },
});
