import React from 'react';
import Routes from 'routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import ErrorBoundary from 'сomponents/ErrorBoundary';
import theme from 'сomponents/theme';
import { AppStyles } from './App.styled';

if (!process.env.REACT_APP_API_URL) {
  throw Error('REACT_APP_API_URL is not defined');
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <>
            <AppStyles />
            <CssBaseline />
            <ErrorBoundary errorView={<div>Something failed</div>}>
              <Routes />
            </ErrorBoundary>
          </>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
