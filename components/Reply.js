import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { styles } from '../lib/styles';

const Reply = ({
  id, content, created_at, author
}) => (
  // console.log(rest);
  <Card key={id} style={styles.reply}>
    <CardContent>
      {content}
      {author} - {created_at}
    </CardContent>
  </Card>
);
Reply.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.string,
  author: PropTypes.string
};

export { Reply };
