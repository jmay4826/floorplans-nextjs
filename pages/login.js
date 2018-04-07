import React from 'react';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';

import TextField from 'material-ui/TextField';
import Card, { CardText } from 'material-ui/Card';

import withMui from '../lib/withMui';
import Layout from '../components/Layout';
import FlatButton from 'material-ui/FlatButton';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('submitting');
    axios
      .post('http://localhost:5000/auth/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(console.log)
      .catch(console.log);
    Router.push('/locations');
  }

  render() {
    return (
      <Layout title="Login">
        <div>
          <Card>
            <CardText>
              <div>
                <TextField
                  hintText="Username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <TextField
                  type="Password"
                  hintText="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                />

                <FlatButton onClick={this.handleSubmit}>Submit</FlatButton>
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
