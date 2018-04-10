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
      x
      y
      complete
      created_at
      updated_at
      replies {
        id
        content
      }
    }
  }
`;
