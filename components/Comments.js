import React from 'react';
import { Comment } from '../components/Comment';

const Comments = ({ comments }) =>
  comments.map((comment, i) => <Comment {...comment} i={i} key={comment.id} />);
export { Comments };
