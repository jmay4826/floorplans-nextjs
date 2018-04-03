import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import TextField from "material-ui/TextField";
import Card, { CardText, CardMedia } from "material-ui/Card";
import Tabs, { Tab } from "material-ui/Tabs";

import withMui from "../lib/withMui";
import withData from "../lib/withData";
import Layout from "../components/Layout";
import FlatButton from "material-ui/FlatButton";
import List from "material-ui/List";

import { GET_LOCATION } from "../graphql/queries";
import CommentList from "../components/CommentList";
import Markers from "../components/Markers";
import AddCommentDialog from "../components/AddCommentDialog";

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
    const props = this.props;
    return (
      <Query query={GET_LOCATION} variables={{ id: props.url.query.id }}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Layout>
                <p>Loading</p>
              </Layout>
            );
          if (error) {
            console.log(error);
            return <p>Error</p>;
          }
          console.log(data);
          const open = data.getLocation.comments.filter(
            ({ complete }) => !complete
          );
          const closed = data.getLocation.comments.filter(
            ({ complete }) => complete
          );
          const displayedComments = this.state.complete ? closed : open;

          return (
            <React.Fragment>
              <Layout
                title={`${data.getLocation.name} (${data.getLocation.id})`}
              >
                <Card style={{ maxWidth: "80%", margin: "0 auto" }}>
                  <div id="floorplan" style={{ position: "relative" }}>
                    <img
                      onClick={e =>
                        this.setState({
                          open: true,
                          x: e.clientX,
                          y: e.clientY
                        })
                      }
                      style={{ maxWidth: "100%" }}
                      src={
                        `https://s3.us-east-2.amazonaws.com/floorplans-uploads/` +
                        data.getLocation.floorplan
                      }
                    />
                    <Markers data={displayedComments} />
                  </div>
                </Card>
                <AddCommentDialog
                  open={this.state.open}
                  x={this.state.x}
                  y={this.state.y}
                  id={data.getLocation.id}
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
          );
        }}
      </Query>
    );
  }
}

export default withData(withMui(Location));
