import "isomorphic-fetch";
import { Icon, Card } from "carbon-components-react";

import Layout from "../components/Layout";

class Index extends React.Component {
  static async getInitialProps(free) {
    console.log(free);
    const req = await fetch("http://localhost:5000/api/users");
    const users = await req.json();
    return { users };
  }
  render() {
    return (
      <Layout title="test">
        {JSON.stringify(this.props)}
        <Icon
          name="icon--add"
          style={{ margin: "50px" }}
          fill="grey"
          description="This is a description of the icon and what it does…"
          className="extra-class"
        />
      </Layout>
    );
  }
}

export default Index;
