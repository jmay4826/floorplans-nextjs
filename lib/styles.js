import css from 'styled-jsx/css';

export const markers = (x, y) => ({
  position: 'absolute',
  display: 'flex',
  top: `${y}%`,
  left: `${x}%`,
  width: '26px',
  height: '26px',
  background: 'rgba(233, 30, 90, 0.8)',
  borderRadius: '50%',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.8)',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  transform: 'translate(-13px, -13px)'
});

export const container = css`
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

export const comment = css`
  .comment {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 5px;
  }
`;

export const actions = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center'
};

export const reply = {
  width: '95%',
  margin: '5px 0'
};

export const floorplan = css`
  #floorplan {
    position: relative;
    display: inline-block;
  }
`;

export default {
  markers,
  container,
  comment,
  actions,
  reply,
  floorplan
};
