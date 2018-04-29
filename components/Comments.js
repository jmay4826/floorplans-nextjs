import React from 'react';
import Card, { CardText } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardActions from 'material-ui/Card/CardActions';
import { FlatButton, IconButton, TextField } from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete';
import Done from 'material-ui/svg-icons/action/done';

import { container, comment, actions, reply } from '../lib/styles';

// helper function for ternaries
const makeTitle = (id, i) => `${id < 1 ? 'Saving...' : ''} ${i + 1}`;
const makeSubtitle = (complete, updated_at, completed_by, created_at, author) =>
  (complete
    ? `Completed ${updated_at} by ${completed_by}`
    : `Created ${created_at} by ${author}`);

const Comments = ({ comments }) =>
  comments.map((
    {
      id,
      complete,
      updated_at,
      completed_by,
      created_at,
      author,
      content,
      replies
    },
    i
  ) => (
    <div key={id} className="container">
      <style jsx>{container}</style>
      <style jsx>{comment}</style>
      <div className="comment">
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
          <CardActions style={actions}>
            <FlatButton label={`Show Replies (${replies.length})`} />
            <IconButton>
              <Delete />
            </IconButton>
            <IconButton>
              <Done />
            </IconButton>
          </CardActions>
        </Card>
        <Card style={reply}>
          <CardText>
            <TextField hintText="Add reply..." />
          </CardText>
        </Card>
        {replies.map(({ id, content }) => (
          <Card key={id} style={reply}>
            <CardText>{content}</CardText>
          </Card>
        ))}
      </div>
    </div>
  ));
export { Comments };
