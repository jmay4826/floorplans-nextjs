import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Store from 'material-ui/svg-icons/action/store';
import InsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Divider from 'material-ui/Divider';
import Link from 'next/link';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  openDrawer = () => this.setState({ open: true });
  closeDrawer = () => this.setState({ open: false });

  render() {
    const { title = 'Store Manager' } = this.props;
    return (
      <Fragment>
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <style jsx global>
          {`
            body {
              margin: 0;
              padding-top: 70px;
            }
          `}
        </style>

        <AppBar
          title={title}
          style={{ position: 'fixed', top: 0 }}
          onLeftIconButtonClick={this.openDrawer}
        />
        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={open => this.setState({ open })}
        >
          <AppBar title="Menu" showMenuIconButton={false} />
          <Link prefetch href="/locations">
            <MenuItem
              onClick={this.closeDrawer}
              primaryText="Locations"
              leftIcon={<Store />}
            />
          </Link>
          <MenuItem
            onClick={this.closeDrawer}
            primaryText="Analytics"
            leftIcon={<InsertChart />}
          />
          <Divider />
          <MenuItem primaryText="Logout" leftIcon={<ExitToApp />} />
        </Drawer>
        {this.props.children}
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default Layout;
