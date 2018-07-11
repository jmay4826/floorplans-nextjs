import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

import { DELETE_COMMENT } from '../graphql/mutations';
import { GET_LOCATION } from '../graphql/queries';

const optimisticResponse = (id, location) => ({
  __typename: 'Mutation',
  deleteComment: {
    id,
    location,
    __typename: 'Comment'
  }
});
const update = (cache, response, location) => {
  const { getLocation } = cache.readQuery({
    query: GET_LOCATION,
    variables: { id: location }
  });

  cache.writeQuery({
    query: GET_LOCATION,
    variables: { id: location },
    data: {
      getLocation: {
        ...getLocation,
        comments: {
          ...getLocation.comments,
          incomplete: getLocation.comments.incomplete.filter(comment => comment.id !== response.data.deleteComment.id)
        }
      }
    }
  });
};

const DeleteComment = ({ id, location }) => (
  <Mutation
    mutation={DELETE_COMMENT}
    optimisticResponse={optimisticResponse(id, location)}
    update={(cache, response) => update(cache, response, location)}
  >
    {deleteComment => (
      <IconButton
        onClick={() => {
          deleteComment({
            variables: {
              id: +id
            }
          });
        }}
      >
        <Delete />
      </IconButton>
    )}
  </Mutation>
);

DeleteComment.propTypes = {
  id: PropTypes.string,
  location: PropTypes.string
};

export { DeleteComment };
