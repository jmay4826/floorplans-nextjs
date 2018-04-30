import React from 'react';
import { styles } from '../lib/styles';

const Markers = ({ markers }) =>
  markers.map(({ id, x, y }, i) => (
    <div key={id} style={styles.markers(x, y)}>
      {i + 1}
    </div>
  ));

export { Markers };
