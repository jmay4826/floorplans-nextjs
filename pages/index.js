import React from 'react';
import Link from 'next/link';

import withMui from '../lib/withMui';
import withData from '../lib/withData';
import Layout from '../components/Layout';

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <Link prefetch href="/login">
          <a href="/login">Login</a>
        </Link>
      </Layout>
    );
  }
}

export default withData(withMui(Index));
