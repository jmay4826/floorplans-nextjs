import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card, { CardText } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardActions from 'material-ui/Card/CardActions';
import { FlatButton, IconButton, TextField } from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import Done from 'material-ui/svg-icons/action/done';
import { styles } from '../lib/styles';

// helper function for ternaries
const makeTitle = (id, i) => `${id < 1 ? 'Saving...' : ''} ${i + 1}`;
const makeSubtitle = (complete, updated_at, completed_by, created_at, author) =>
  (complete
    ? `Completed ${updated_at} by ${completed_by}`
    : `Created ${created_at} by ${author}`);

class Comment extends Component {
  render() {
    const {
      id,
      complete,
      updated_at,
      completed_by,
      created_at,
      author,
      content,
      replies,
      i
    } = this.props;
    return (
      <div key={id} style={styles.container}>
        <div style={styles.comment}>
          <Card key={id} style={{ width: '100%' }}>
            <CardHeader
              title={makeTitle(id, i)}
              subtitle={makeSubtitle(
                complete,
                updated_at,
                completed_by,
                created_at,
                author
              )}
            />
            <CardText>{content}</CardText>
            <CardActions style={styles.actions}>
              <FlatButton label={`Show Replies (${replies.length})`} />
              <IconButton>
                <Delete />
              </IconButton>
              <IconButton>
                <Done />
              </IconButton>
            </CardActions>
          </Card>
          <Card style={styles.reply}>
            <CardText>
              <TextField hintText="Add reply..." />
            </CardText>
          </Card>
          {replies.map(reply => (
            <Card key={reply.id} style={styles.reply}>
              <CardText>{reply.content}</CardText>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  id: PropTypes.string,
  complete: PropTypes.bool,
  updated_at: PropTypes.string,
  completed_by: PropTypes.string,
  created_at: PropTypes.string,
  author: PropTypes.string,
  content: PropTypes.string,
  replies: PropTypes.arrayOf(PropTypes.object),
  i: PropTypes.number
};

export { Comment };
