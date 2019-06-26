import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link"
import { onError } from "apollo-link-error"
import { API_URL_DEV, API_URL_PROD } from "react-native-dotenv";
import Routes from "./Routes";
export default class App extends Component {
  constructor(...args) {
    super(args);
    const httpLink = new createUploadLink({
      uri: API_URL_DEV,
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        if (networkError.message === "Network request failed") {
          console.log("ไม่สามารถเชื่อมต่อกับระบบ กรุณาลองใหม่ภายหลัง");
        }
        console.log(
          `Network error: ${networkError.message} Code:${
            networkError.statusCode
          }`
        );
      }
    });

    this.client = new ApolloClient({
      link: ApolloLink.from([errorLink, httpLink]),
      cache: new InMemoryCache()
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Routes />
      </ApolloProvider>
    );
  }
}
