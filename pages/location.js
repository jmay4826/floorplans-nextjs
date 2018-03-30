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

import CommentList from "../components/CommentList";
import Markers from "../components/Markers";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
  }
  render() {
    const query = gql`
      query location($id: String!) {
        getLocation(id: $id) {
          name
          latitude
          longitude
          floorplan
          district
          active
          height
          width
          comments {
            id
            content
            author
            x
            y
            complete
            created_at
            updated_at
          }
        }
      }
    `;

    const props = this.props;
    return (
      <Layout title={props.url.query.id}>
        <Query query={query} variables={{ id: props.url.query.id }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            if (error) {
              console.log(error);
              return <p>Error</p>;
            }
            const open = data.getLocation.comments.filter(
              ({ complete }) => !complete
            );
            const closed = data.getLocation.comments.filter(
              ({ complete }) => complete
            );
            const displayedComments = this.state.complete ? closed : open;

            return (
              <React.Fragment>
                <Card style={{ maxWidth: "80%", margin: "0 auto" }}>
                  <div id="floorplan" style={{ position: "relative" }}>
                    <img
                      style={{ maxWidth: "100%" }}
                      src={
                        `https://s3.us-east-2.amazonaws.com/floorplans-uploads/` +
                        data.getLocation.floorplan
                      }
                    />
                    <Markers data={displayedComments} />
                  </div>
                </Card>
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
              </React.Fragment>
            );
          }}
        </Query>
      </Layout>
    );
  }
}

export default withData(withMui(Location));
