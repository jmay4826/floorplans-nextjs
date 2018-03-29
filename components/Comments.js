import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const query = gql`
  query location($id: String!) {
    getLocation(id: $id) {
      comments {
        content
      }
    }
  }
`;

const CommentList = ({ comments = [] }) => {
  console.log(comments);
  return comments.map(({ content }) => <div>{content}</div>);
};

export default graphql(query, {
  options: {
    variables: {
      id: "D104"
    }
  },
  props: ({ data }) => {
    return { comments: data.getLocation.comments };
  }
})(CommentList);
