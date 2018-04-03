import React from 'react';
import { Mutation, Query } from 'react-apollo';

import FlatButton from 'material-ui/FlatButton';

import { ADD_COMMENT } from '../graphql/mutations';
import { GET_LOCATION, GET_NEW_COMMENT } from '../graphql/queries';

const SubmitComment = props => (
  <Query query={GET_NEW_COMMENT}>
    {({ data: { newComment } }) => {
      console.log(newComment);
      return (
        <Mutation
          mutation={ADD_COMMENT}
          optimisticResponse={{
            addComment: {
              ...newComment,
              id: Math.random(),
              complete: false,
              updated_at: null,
              created_at: new Date().toDateString(),
              replies: [],
              __typename: 'Comment'
            }
          }}
          update={(cache, response) => {
            console.log(response);
            const cached = cache.readQuery({
              query: GET_LOCATION,
              variables: { id: newComment.location }
            });

            cache.writeQuery({
              query: GET_LOCATION,
              variables: { id: newComment.location },
              data: {
                getLocation: {
                  ...cached.getLocation,
                  comments: [
                    response.data.addComment,
                    ...cached.getLocation.comments
                  ]
                }
              }
            });
          }}
        >
          {(submitComment, { error, loading }) => (
            <FlatButton
              primary
              onClick={() => {
                submitComment({
                  variables: { input: { ...newComment, __typename: undefined } }
                });
                props.handleClose();
              }}
            >
              Submit
            </FlatButton>
          )}
        </Mutation>
      );
    }}
  </Query>
);

export default SubmitComment;
