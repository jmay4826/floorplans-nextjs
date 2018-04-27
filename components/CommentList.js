import React from "react";
import Card, { CardText } from "material-ui/Card";
import CardHeader from "material-ui/Card/CardHeader";
import CardActions from "material-ui/Card/CardActions";
import { FlatButton, IconButton, TextField } from "material-ui";
import Delete from "material-ui/svg-icons/action/delete";
import Done from "material-ui/svg-icons/action/done";

//helper function for ternaries

const CommentList = ({ comments }) =>
  comments.map((comment, i) => (
    <div
      key={comment.id}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          padding: "5px"
        }}
      >
        <Card key={comment.id} style={{ width: "100%" }}>
          <CardHeader
            title={`${comment.id < 1 ? "Saving..." : ""} ${i + 1}`}
            subtitle={
              comment.complete
                ? `Completed ${comment.updated_at} by ${comment.completed_by}`
                : `Created ${comment.created_at} by ${comment.author}`
            }
          />
          <CardText>{comment.content}</CardText>
          <CardActions
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <FlatButton label={`Show Replies (${comment.replies.length})`} />
            <IconButton>
              <Delete />
            </IconButton>
            <IconButton>
              <Done />
            </IconButton>
          </CardActions>
        </Card>
        <Card style={{ width: "95%", margin: "5px 0" }}>
          <CardText>
            <TextField hintText="Add reply..." />
          </CardText>
        </Card>
        {comment.replies.map(reply => (
          <Card key={reply.id} style={{ width: "95%", margin: "5px 0" }}>
            <CardText>{reply.content}</CardText>
          </Card>
        ))}
      </div>
    </div>
  ));
export default CommentList;
