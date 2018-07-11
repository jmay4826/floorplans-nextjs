import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Card, { CardText } from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';

import { Reply } from './Reply';
import { DeleteComment } from './DeleteComment';
import { CompleteComment } from './CompleteComment';
import { styles } from '../lib/styles';

const makeTitle = (id, i) => `${id < 1 ? 'Saving...' : ''} ${i + 1}`;
const makeSubtitle = (complete, updated_at, completed_by, created_at, author) =>
  (complete
    ? `Completed ${updated_at} by ${completed_by}`
    : `Created ${created_at} by ${author}`);

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showReplies: false
    };
  }
  toggleReplies = () =>
    this.setState(({ showReplies }) => ({ showReplies: !showReplies }));
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
      location,
      image,
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
            {image && (
              <CardMedia>
                <img src={image} />
              </CardMedia>
            )}
            <CardText>{content}</CardText>
            <CardActions style={styles.actions}>
              <Button
                label={`Show Replies (${replies.length})`}
                onClick={this.toggleReplies}
              />
              {!complete && (
                <Fragment>
                  {/* this will need to check if user === author */}
                  <DeleteComment id={id} location={location} />
                  <CompleteComment id={id} location={location} />
                </Fragment>
              )}
            </CardActions>
          </Card>
          {this.state.showReplies && (
            <Fragment>
              {replies.map(reply => <Reply key={reply.id} {...reply} />)}
              <Card style={styles.reply}>
                <CardText>
                  <TextField hintText="Add reply..." />
                </CardText>
              </Card>
            </Fragment>
          )}
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
  location: PropTypes.string,
  i: PropTypes.number
};

export { Comment };
