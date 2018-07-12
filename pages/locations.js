import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withData from '../lib/withData';
import Layout from '../components/Layout';

import { Locations } from '../components/Locations';
import { styles } from '../lib/styles';

class locations extends Component {
  constructor(props) {
    super(props);
    this.state = { filter: '' };
  }

  handleFilter = e => this.setState({ filter: e.target.value });
  render() {
    return (
      <Layout title="Choose a location">
        <div style={styles.container}>
          <Card style={{ minWidth: '80%' }}>
            <CardContent>
              <TextField onChange={this.handleFilter} label="Search" />
              <div>
                <Locations filter={this.state.filter} />
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default withData(locations);
