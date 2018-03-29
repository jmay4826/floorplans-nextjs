import axios from "axios";
import gql from "graphql-tag";

import withMui from "../lib/withMui";
import withData from "../lib/withData";
import Layout from "../components/Layout";

import TestComponent from "../components/test";

class Index extends React.Component {
  render() {
    console.log("indexjs", this.props);
    return (
      <Layout>
        <TestComponent />
      </Layout>
    );
  }
}

export default withData(withMui(Index));
