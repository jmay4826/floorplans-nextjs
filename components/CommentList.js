import React from "react";
import Card, { CardText } from "material-ui/Card";
import CardHeader from "material-ui/Card/CardHeader";

const CommentList = ({ comments }) => {
  console.log(comments);
  return comments.map((comment, i) => (
    <Card key={comment.id}>
      <CardHeader
        title={i + 1}
        subtitle={
          comment.complete
            ? `Completed ${comment.updated_at} by ${comment.completed_by}`
            : `Created ${comment.created_at} by ${comment.author}`
        }
      />
      <CardText>{comment.content}</CardText>
    </Card>
  ));
};

export default CommentList;
