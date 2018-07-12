import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import withData from '../lib/withData';
import Layout from '../components/Layout';

import { GET_LOCATION } from '../graphql/queries';
import { Comments } from '../components/Comments';
import { Floorplan } from '../components/Floorplan';
import AddCommentDialog from '../components/AddCommentDialog';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      open: false
    };
  }

  closeDialog = () => this.setState({ open: false });
  openDialog = () => this.setState({ open: true });

  render() {
    console.log(this.props);
    return (
      <Query
        query={GET_LOCATION}
        variables={{ id: this.props.router.query.id }}
      >
        {({ loading, error, data: { getLocation = {} } }) => {
          if (loading) return <div>Loading</div>;
          if (error) {
            console.log(error);
            return <p>Error</p>;
          }
          const {
            comments: { completed = [], incomplete = [] },
            id = 0,
            name = '',
            floorplan = ''
          } = getLocation;

          const markers = this.state.complete ? completed : incomplete;

          return (
            <Layout title={`${name} (${id})`}>
              <Floorplan
                openDialog={this.openDialog}
                id={id}
                floorplan={floorplan}
                markers={markers}
              />
              <AddCommentDialog
                open={this.state.open}
                closeDialog={this.closeDialog}
              />
              <Tabs
                centered
                value={this.state.complete ? 'complete' : 'incomplete'}
                onChange={() =>
                  this.setState(prev => ({ complete: !prev.complete }))
                }
              >
                <Tab
                  value="incomplete"
                  label={`Incomplete (${incomplete.length})`}
                />

                <Tab
                  value="complete"
                  label={`Recently Completed (${completed.length})`}
                />
              </Tabs>
              <Comments
                comments={this.state.complete ? completed : incomplete}
              />
            </Layout>
          );
        }}
      </Query>
    );
  }
}

Location.propTypes = {
  url: PropTypes.object
};

export default withData(Location);
