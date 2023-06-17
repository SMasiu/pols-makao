import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

export const wsLink = new WebSocketLink(
  new SubscriptionClient('ws://localhost:8080/graphql', {
    lazy: true,
  })
);

export const httpLink = new HttpLink({
  uri: 'http://localhost:8080/graphql',
  credentials: 'include',
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const apiClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include',
});
