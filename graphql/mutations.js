import gql from 'graphql-tag';

export const NEW_COMMENT = gql`
  mutation newComment($input: NewComment!) {
    newComment(input: $input) @client {
      id
      content
      author
      x
      y
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($input: NewComment!) {
    addComment(input: $input) {
      id
      content
      author
      image
      x
      y
      complete
      created_at
      updated_at
      location
      replies {
        id
        content
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const COMPLETE_COMMENT = gql`
  mutation completeComment($id: Int!) {
    completeComment(id: $id) {
      id
    }
  }
`;
