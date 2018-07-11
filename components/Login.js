import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Router from 'next/router';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
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
      <Fragment>
        <div className="container">
          <Card>
            {/* <CardContent> */}
            <div className="login">
              <TextField
                value={this.state.username}
                hintText="Username"
                onChange={e => this.setState({ username: e.target.value })}
              />
              <TextField
                value={this.state.password}
                type="Password"
                hintText="Password"
                onChange={e => this.setState({ password: e.target.value })}
              />

              <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
            {/* </CardContent> */}
          </Card>
        </div>

        <style jsx>
          {`
            .login {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 10px;
            }
            .container {
              width: 60%;
              margin: 0 auto;
              transition: width 200ms;
            }
            @media (max-width: 450px) {
              .container {
                width: 100%;
              }
            }
          `}
        </style>
      </Fragment>
    );
  }
}

export { Login };
