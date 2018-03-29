import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import gql from "graphql-tag";
import { ApolloProvider, graphql } from "react-apollo";

import TextField from "material-ui/TextField";
import Card, { CardText, CardMedia } from "material-ui/Card";

import withMui from "../lib/withMui";
import withData from "../lib/withData";
import Layout from "../components/Layout";
import FlatButton from "material-ui/FlatButton";
import List from "material-ui/List";

import Comments from "../components/Comments";

class Location extends React.Component {
  // static async getInitialProps(ctx) {
  //   const query = `{
  //         getLocation(id: "${ctx.query.id}") {
  //             name
  //             latitude
  //             longitude
  //             floorplan
  //             district
  //             active
  //             height
  //             width
  //             comments {
  //                 id
  //                 content
  //                 author
  //                 x
  //                 y
  //                 complete
  //             }
  //         }
  //     }
  //       `;
  //   try {
  //     return {
  //       id: ctx.query.id,
  //       location: (await axios.post(`http://localhost:5000/graphql`, {
  //         query
  //       })).data.data.getLocation
  //     };
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  render() {
    console.log(this.props);

    const comments = [];
    const floorplan = "floorplans/D101.png";

    let open = comments.filter(({ complete }) => !complete);
    let closed = comments.filter(({ complete }) => complete);
    return (
      <Layout title={this.props.id}>
        <Card>
          <img
            style={{ maxWidth: "80%" }}
            src={
              `https://s3.us-east-2.amazonaws.com/floorplans-uploads/` +
              floorplan
            }
          />
          <CardText>{JSON.stringify(open)}</CardText>
          <Comments />
          <Link href="/fake">Fake</Link>
        </Card>
      </Layout>
    );
  }
}

export default withData(withMui(Location));
