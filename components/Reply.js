import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardText } from 'material-ui/Card';

import { styles } from '../lib/styles';

const Reply = ({ id, content }) => (
  <Card key={id} style={styles.reply}>
    <CardText>{content}</CardText>
  </Card>
);

Reply.propTypes = {
  id: PropTypes.string,
  content: PropTypes.string
};

export { Reply };
