import { Fragment } from "react";
import Head from "next/head";
import { Toolbar, ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";
import Menu from "material-ui/svg-icons/navigation/menu";
import { AppBar, Drawer, MenuItem } from "material-ui";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleDrawer = () => {
    console.log("toggle");
    this.setState(({ open }) => ({ open: !open }));
  };

  render() {
    const { title = "Store Manager" } = this.props;
    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <style jsx global>{`
          body {
            margin: 0;
          }
        `}</style>

        <AppBar title={title} onLeftIconButtonClick={this.toggleDrawer} />
        <Drawer open={this.state.open} docked={false}>
          <MenuItem>Test</MenuItem>
        </Drawer>
        {this.props.children}
      </Fragment>
    );
  }
}
export default Layout;
