import axios from "axios";
import Router from "next/router";

import TextField from "material-ui/TextField";
import Card, { CardText } from "material-ui/Card";

import withMui from "../components/hocs/withMui";
import Layout from "../components/Layout";
import FlatButton from "material-ui/FlatButton";

class Index extends React.Component {
  static async getInitialProps(free) {
    // const req = await axios("http://localhost:5000/api/users");
    // const users = await req.json();
    // return { users };
  }

  handleSubmit() {
    axios
      .post("http://localhost:5000/auth/login", {
        username: "demoadmin",
        password: "password"
      })
      .then(console.log)
      .catch(console.log);
  }

  render() {
    return (
      <Layout title="Login">
        <Card>
          <CardText>
            <TextField hintText="Username" />
            <TextField hintText="Password" />
            <FlatButton onClick={this.handleSubmit}>Submit</FlatButton>
          </CardText>
        </Card>
      </Layout>
    );
  }
}

export default withMui(Index);
