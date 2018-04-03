import gql from 'graphql-tag';

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
