import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardText } from 'material-ui/Card';

import { styles } from '../lib/styles';

const Reply = ({
  id, content, created_at, author
}) => (
  // console.log(rest);
  <Card key={id} style={styles.reply}>
    <CardText>
      {content}
      {author} - {created_at}
    </CardText>
  </Card>
);
Reply.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.string,
  author: PropTypes.string
};

export { Reply };
