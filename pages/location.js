import React from "react";
import PropTypes from "prop-types";
import { Query, ApolloConsumer } from "react-apollo";

import Paper from "material-ui/Card";
import Tabs, { Tab } from "material-ui/Tabs";

import withMui from "../lib/withMui";
import withData from "../lib/withData";
import Layout from "../components/Layout";

import { GET_LOCATION, GET_NEW_COMMENT } from "../graphql/queries";
import CommentList from "../components/CommentList";
import Markers from "../components/Markers";
import AddCommentDialog from "../components/AddCommentDialog";
import { ApolloCache } from "apollo-cache";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      open: false,
      x: 0,
      y: 0
    };
  }

  handleClose = () => this.setState({ open: false, x: 0, y: 0 });
  handleSubmit = () => this.handleClose();

  render() {
    return (
      <Query query={GET_LOCATION} variables={{ id: this.props.url.query.id }}>
        {({ loading, error, data: { getLocation } }) => {
          if (loading) {
            return (
              <Layout>
                <p>Loading</p>
              </Layout>
            );
          }
          if (error) {
            console.log(error);
            return <p>Error</p>;
          }

          const open = getLocation.comments.filter(({ complete }) => !complete);
          const closed = getLocation.comments.filter(
            ({ complete }) => complete
          );
          const displayedComments = this.state.complete ? closed : open;

          return (
            <Query query={GET_NEW_COMMENT}>
              {({ data, client }) => (
                <React.Fragment>
                  <Layout title={`${getLocation.name} (${getLocation.id})`}>
                    <Paper
                      style={{
                        maxWidth: "80%",
                        margin: "0 auto",
                        textAlign: "center"
                      }}
                    >
                      <div
                        id="floorplan"
                        style={{
                          position: "relative",
                          display: "inline-block"
                        }}
                      >
                        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
                        {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                        <img
                          alt="Floorplan"
                          onClick={e => {
                            client.writeData({
                              data: {
                                newComment: {
                                  id: "NewComment:",
                                  open: true,
                                  x:
                                    (e.clientX - e.target.x) /
                                    e.target.width *
                                    100,
                                  y:
                                    (e.clientY - e.target.y) /
                                    e.target.height *
                                    100,
                                  __typename: "NewComment"
                                }
                              }
                            });
                            this.setState({
                              open: true
                            });
                          }}
                          style={{ maxWidth: "100%", maxHeight: "60vh" }}
                          src={`https://s3.us-east-2.amazonaws.com/floorplans-uploads/${
                            getLocation.floorplan
                          }`}
                        />
                        {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
                        {/* eslint-disable jsx-a11y/click-events-have-key-events */}
                        <Markers data={displayedComments} />
                      </div>
                    </Paper>
                    <AddCommentDialog
                      open={this.state.open}
                      x={this.state.x}
                      y={this.state.y}
                      id={getLocation.id}
                      handleClose={this.handleClose}
                      handleSubmit={this.handleSubmit}
                    />
                    <Tabs>
                      <Tab
                        label={`Open (${open.length})`}
                        onActive={() => {
                          this.setState({ complete: false });
                        }}
                      />

                      <Tab
                        label={`Recently Completed (${closed.length})`}
                        onActive={() => {
                          this.setState({ complete: true });
                        }}
                      />
                    </Tabs>
                    <CommentList comments={displayedComments} />
                  </Layout>
                </React.Fragment>
              )}
            </Query>
          );
        }}
      </Query>
    );
  }
}

Location.propTypes = {
  url: PropTypes.object
};

export default withData(withMui(Location));
