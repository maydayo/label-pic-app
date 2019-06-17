import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import Routes from "./Routes";
export default class App extends Component {
  constructor(...args) {
    super(args);
    const httpLink = new createUploadLink({
      uri: "http://192.168.2.95:3005/graphql/",
    });

    this.client = new ApolloClient({
      link: httpLink,
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
