import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Paper from 'material-ui/Card';

import { Markers } from '../components/Markers';

import { GET_NEW_COMMENT } from '../graphql/queries';

const getPosition = e => ({
  x: 100 * ((e.clientX - e.target.x) / e.target.width),
  y: 100 * ((e.clientY - e.target.y) / e.target.height)
});

const Floorplan = ({
  id, floorplan, markers, openDialog
}) => (
  <Paper
    style={{
      maxWidth: '80%',
      margin: '0 auto',
      textAlign: 'center'
    }}
  >
    <div id="floorplan">
      <style jsx>
        {`
          #floorplan {
            position: relative;
            display: inline-block;
          }
        `}
      </style>
      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
      {/* eslint-disable jsx-a11y/click-events-have-key-events */}
      <Query query={GET_NEW_COMMENT}>
        {({
          loading, error, data, client
        }) => {
          if (loading) return <div>Loading</div>;
          if (error) {
            console.log(error);
            return <p>Error</p>;
          }

          return (
            <img
              alt="Floorplan"
              onClick={e => {
                client.writeData({
                  data: {
                    newComment: {
                      ...data.newComment,
                      location: id,
                      ...getPosition(e)
                    }
                  }
                });
                openDialog();
              }}
              style={{ maxWidth: '100%', maxHeight: '60vh' }}
              src={`https://s3.us-east-2.amazonaws.com/floorplans-uploads/${floorplan}`}
            />
          );
        }}
      </Query>
      {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      <Markers markers={markers} />
    </div>
  </Paper>
);

Floorplan.propTypes = {
  id: PropTypes.string,
  floorplan: PropTypes.string,
  markers: PropTypes.array,
  openDialog: PropTypes.func.isRequired
};

export { Floorplan };
