import React from 'react';
import Card, { CardText } from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';

const CommentList = ({ comments }) =>
  // console.log(comments);
  comments.map((comment, i) => (
    <React.Fragment key={comment.id}>
      <Card key={comment.id}>
        <CardHeader
          title={`${comment.id < 1 ? 'Saving...' : ''} ${i + 1}`}
          subtitle={
            comment.complete
              ? `Completed ${comment.updated_at} by ${comment.completed_by}`
              : `Created ${comment.created_at} by ${comment.author}`
          }
        />
        <CardText>{comment.content}</CardText>
        {/* <div>{`${comment.replies.length} repl${
        comment.replies.length === 1 ? "y" : "ies"
      }`}</div> */}
      </Card>
      <div>
        {comment.replies &&
          comment.replies.map(reply => (
            <Card key={reply.id}>
              <CardText>{reply.content}</CardText>
            </Card>
          ))}
      </div>
    </React.Fragment>
  ));
export default CommentList;
