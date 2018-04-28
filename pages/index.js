import React from 'react';
import withMui from '../lib/withMui';
import Layout from '../components/Layout';
import { Login } from '../components/Login';

const Index = () => (
  <Layout title="Login">
    <Login />
  </Layout>
);

export default withMui(Index);
