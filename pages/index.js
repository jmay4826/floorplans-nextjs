import axios from "axios";
import gql from "graphql-tag";
import Link from "next/link";

import withMui from "../lib/withMui";
import withData from "../lib/withData";
import Layout from "../components/Layout";

import TestComponent from "../components/test";

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <TestComponent />
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Layout>
    );
  }
}

export default withData(withMui(Index));
// export default withMui(Index);
