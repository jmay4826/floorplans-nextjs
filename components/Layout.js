import { Fragment } from "react";
import Head from "next/head";
import { Toolbar } from "material-ui/Toolbar";
import withMui from "../components/hocs/withMui";

const Layout = props => (
  <Fragment>
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Toolbar />
    {props.children}
  </Fragment>
);
export default withMui(Layout);
