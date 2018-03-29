import axios from "axios";
import Router from "next/router";
import Link from "next/link";

import TextField from "material-ui/TextField";
import Card, { CardText } from "material-ui/Card";

import withMui from "../lib/withMui";
import Layout from "../components/Layout";
import FlatButton from "material-ui/FlatButton";

class Index extends React.Component {
  static async getInitialProps(free) {
    // const req = await axios("http://localhost:5000/api/users");
    // const users = await req.json();
    // return { users };
  }

  handleSubmit() {
    // axios
    //   .post("http://localhost:5000/auth/login", {
    //     username: "demoadmin",
    //     password: "password"
    //   })
    //   .then(console.log)
    //   .catch(console.log);
  }

  render() {
    return (
      <Layout title="Login">
        <div>
          <Card>
            <CardText>
              <div>
                <TextField hintText="Username" />
                <TextField hintText="Password" />
                <Link href="/locations">
                  <FlatButton onClick={this.handleSubmit}>Submit</FlatButton>
                </Link>
              </div>
            </CardText>
          </Card>
        </div>
        <style jsx>
          {`
            div {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 10px;
            }
          `}
        </style>
      </Layout>
    );
  }
}

export default withMui(Index);
