import { Fragment } from "react";
import Head from "next/head";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import Menu from "material-ui/svg-icons/navigation/menu";

const Layout = props => (
  <Fragment>
    <Head>
      <title>{props.title || "Store Manager"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <style jsx global>{`
      body {
        margin: 0;
      }
    `}</style>
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <Menu />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarTitle text={props.title} />
      </ToolbarGroup>
    </Toolbar>
    {props.children}
  </Fragment>
);
export default Layout;
