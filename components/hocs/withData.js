import React, { Fragment, Component } from "react";
import { ApolloProvider } from "react-apollo";
import Head from "next/head";
import client from "../client";
import { Toolbar } from "material-ui/Toolbar";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import injectTapEventPlugin from "react-tap-event-plugin"; //still needed?
// import myTheme from "styles/theme";

// const muiTheme = myTheme;

export default function(NextPage) {
  class outputComponent extends Component {
    static async getInitialProps(ctx) {
      let pageProps = {};
      if (NextPage.getInitialProps) {
        pageProps = await NextPage.getInitialProps(ctx);
      }

      return {
        ...pageProps
      };
    }
    render() {
      return (
        <ApolloProvider client={client}>
          <NextPage {...this.props} />
        </ApolloProvider>
      );
    }
  }

  return outputComponent;
}
