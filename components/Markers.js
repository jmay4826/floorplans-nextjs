import React from 'react';
import { markers } from '../lib/styles';

const Markers = ({ data }) =>
  data.map(({ id, x, y }, i) => (
    <div key={id} style={markers(x, y)}>
      {i + 1}
    </div>
  ));

export default Markers;
