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
      const { req } = ctx;
      const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
      let pageProps = {};
      if (NextPage.getInitialProps) {
        pageProps = await NextPage.getInitialProps(ctx);
      }

      return {
        ...pageProps,
        userAgent
      };
    }
    render() {
      let userAgent = this.props.userAgent;
      return (
        <MuiThemeProvider>
          <NextPage {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  return outputComponent;
}
