import { ApolloProvider } from '@apollo/client';
import { apiClient } from './api';
import { Router } from './Router';
import 'antd/dist/antd.css';

export const App = () => {
  return (
    <ApolloProvider client={apiClient}>
      <Router />
    </ApolloProvider>
  );
};
