import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';

import FlatButton from 'material-ui/FlatButton';

import { ADD_COMMENT } from '../graphql/mutations';
import { GET_LOCATION, GET_NEW_COMMENT } from '../graphql/queries';

const SubmitComment = (props: Object) => (
  <Query query={GET_NEW_COMMENT}>
    {({ data: { newComment } }) => {
      console.log(newComment);
      return (
        <Mutation
          mutation={ADD_COMMENT}
          optimisticResponse={{
            __typename: 'Mutation',
            addComment: {
              ...newComment,
              id: -1,
              complete: false,
              author: 'none',
              updated_at: null,
              created_at: new Date().toDateString(),
              replies: [],
              __typename: 'Comment'
            }
          }}
          update={(cache, response) => {
            console.log('response', response);

            const cached = cache.readQuery({
              query: GET_LOCATION,
              variables: { id: newComment.location }
            });
            console.log(cached);

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
          {(submitComment, { error, loading }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading</p>;
            return (
              <FlatButton
                primary
                onClick={() => {
                  submitComment({
                    variables: {
                      input: {
                        ...newComment,
                        id: undefined,
                        __typename: undefined
                      }
                    }
                  });
                  props.handleClose();
                }}
              >
                Submit
              </FlatButton>
            );
          }}
        </Mutation>
      );
    }}
  </Query>
);

SubmitComment.propTypes = {
  handleClose: PropTypes.func
};

export default SubmitComment;
