import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Card, { CardText } from 'material-ui/Card';

import withMui from '../lib/withMui';
import withData from '../lib/withData';
import Layout from '../components/Layout';

import { Locations } from '../components/Locations';
import { container } from '../lib/styles';

class locations extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: '' };
  }

  handleFilter = e => this.setState({ filter: e.target.value });
  render() {
    return (
      <Layout title="Choose a location">
        <div className="container">
          <Card>
            <CardText>
              <TextField onChange={this.handleFilter} hintText="Search" />
              <Locations filter={this.state.filter} />
            </CardText>
          </Card>
          <style jsx>{container}</style>
        </div>
      </Layout>
    );
  }
}

export default withData(withMui(locations));
