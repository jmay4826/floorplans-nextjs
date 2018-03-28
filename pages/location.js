import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import gql from "graphql-tag";
import { ApolloProvider, graphql } from "react-apollo";

import TextField from "material-ui/TextField";
import Card, { CardText, CardMedia } from "material-ui/Card";

import client from "../components/client";
import withMui from "../components/hocs/withMui";
import withData from "../components/hocs/withData";
import Layout from "../components/Layout";
import FlatButton from "material-ui/FlatButton";
import  List  from "material-ui/List";

// const outer = props => {
//   console.log(props);
//   return (
//     <ApolloProvider client={client}>
//       <Layout title={props.id}>
//         <Location {...props.location} />
//       </Layout>
//     </ApolloProvider>
//   );
// };

// outer.getInitialProps = async ctx => {
//   const query = `{
//     getLocation(id: "${ctx.query.id}") {
//         name
//         latitude
//         longitude
//         floorplan
//         district
//         active
//         height
//         width
//         comments {
//             id
//             content
//             author
//             x
//             y
//             complete
//         }
//     }
// }
//   `;
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
// };

class Location extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx);
    const query = `{
          getLocation(id: "${ctx.query.id}") {
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
              }
          }
      }
        `;
    try {
      return {
        id: ctx.query.id,
        location: (await axios.post(`http://localhost:5000/graphql`, {
          query
        })).data.data.getLocation
      };
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    console.log(this.props);
    const { comments } = this.props.location;
    let open = comments.filter(({ complete }) => !complete);
    let closed = comments.filter(({ complete }) => complete);
    return (
      <Layout title={this.props.id}>
        <Card>
          <img src={this.props.floorplan} />
          <CardText>{JSON.stringify(open)}</CardText>
          <Link href="/fake">Fake</Link>
        </Card>
      </Layout>
    );
  }
}

// Location = graphql(gql`
//   query {
//     getLocation(id: "D100") {
//       id
//       name
//     }
//   }
// `)(Location);

export default withData(withMui(Location));
