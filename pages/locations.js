import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import gql from "graphql-tag";
import { ApolloProvider, graphql } from "react-apollo";

import TextField from "material-ui/TextField";
import Card, { CardText } from "material-ui/Card";

import client from "../components/client";
import withMui from "../components/hocs/withMui";
import Layout from "../components/Layout";
import FlatButton from "material-ui/FlatButton";

const outer = () => (
  <ApolloProvider client={client}>
    <Layout title="Locations">
      <LocationsWithData />
    </Layout>
  </ApolloProvider>
);

class Locations extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Card>
        <CardText>
          {this.props.data.user &&
            this.props.data.user.locations.map(location => (
              <Link href={`/location?id=${location.id}`}>
                <FlatButton>{location.id}</FlatButton>
              </Link>
            ))}
          <FlatButton onClick={this.handleSubmit}>Location</FlatButton>
        </CardText>
      </Card>
    );
  }
}

const LocationsWithData = graphql(gql`
  query {
    user: getUser {
      username
      type
      name
      locations {
        id
        name
      }
    }
  }
`)(Locations);

export default withMui(outer);
