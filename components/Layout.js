import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import Store from '@material-ui/icons/Store';
import InsertChart from '@material-ui/icons/InsertChart';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
        <AppBar position="sticky" color="secondary">
          <Toolbar>
            <IconButton
              aria-label="menu"
              onClick={this.state.open ? this.closeDrawer : this.openDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title">{title}</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          {/* <AppBar title="Menu" showMenuIconButton={false} /> */}
          <List>
            <Link prefetch href="/locations">
              <ListItem button onClick={this.closeDrawer}>
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText>Locations</ListItemText>
              </ListItem>
            </Link>
            <ListItem
              onClick={this.closeDrawer}
              primaryText="Analytics"
              leftIcon={<InsertChart />}
            />
            <Divider />
            <ListItem primaryText="Logout" leftIcon={<ExitToApp />} />
          </List>
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
