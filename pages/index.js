import axios from "axios";

import withMui from "../components/hocs/withMui";
import Layout from "../components/Layout";

class Index extends React.Component {
  static async getInitialProps(ctx) {
    try {
      const data = {};
      // const { data } = await axios.get("http://localhost:5000/authcheck");
      return { user: data };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
  render() {
    console.log(this.props);
    return <Layout />;
  }
}

export default withMui(Index);
