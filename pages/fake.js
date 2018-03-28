import React from "react";
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
import { List } from "material-ui";

class Fake extends React.Component {
  render() {
    console.log(this.props);
    return JSON.stringify(this.props);
  }
}

export default withData(withMui(Fake));
