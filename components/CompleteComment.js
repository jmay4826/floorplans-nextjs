import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';

import { COMPLETE_COMMENT } from '../graphql/mutations';
import { GET_LOCATION } from '../graphql/queries';

const optimisticResponse = (id, location) => ({
  __typename: 'Mutation',
  completeComment: {
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

  const completed = getLocation.comments.incomplete.find(comment => comment.id === response.data.completeComment.id);

  cache.writeQuery({
    query: GET_LOCATION,
    variables: { id: location },
    data: {
      getLocation: {
        ...getLocation,
        comments: {
          ...getLocation.comments,
          incomplete: getLocation.comments.incomplete.filter(comment => comment.id !== response.data.completeComment.id),
          completed: [completed, ...getLocation.comments.completed]
        }
      }
    }
  });
};

const CompleteComment = ({ id, location }) => (
  <Mutation
    mutation={COMPLETE_COMMENT}
    optimisticResponse={optimisticResponse(id, location)}
    update={(cache, response) => update(cache, response, location)}
  >
    {completeComment => (
      <IconButton
        onClick={() => {
          completeComment({
            variables: {
              id: +id
            }
          });
        }}
      >
        <Done />
      </IconButton>
    )}
  </Mutation>
);

CompleteComment.propTypes = {
  id: PropTypes.string,
  location: PropTypes.string
};

export { CompleteComment };
