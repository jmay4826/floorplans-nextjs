import React, { Fragment, Component } from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin"; //still needed?
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
// import myTheme from "styles/theme";

// const muiTheme = myTheme;

export default function(NextPage) {
  if (!process.tapEventInjected) {
    injectTapEventPlugin();
    process.tapEventInjected = true;
  }

  class outputComponent extends Component {
    static async getInitialProps(ctx) {
      const { req } = ctx;
      const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
      console.log(userAgent);
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
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme, { userAgent })}>
          <NextPage {...this.props} />
        </MuiThemeProvider>
      );
    }
  }

  return outputComponent;
}
