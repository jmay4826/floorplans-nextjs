const markers = (x, y) => ({
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

const container = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center'
};

const comment = {
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '5px'
};

const actions = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center'
};

const reply = {
  width: '95%',
  margin: '5px 0'
};

const floorplan = {
  position: 'relative',
  display: 'inline-block'
};

const styles = {
  markers,
  container,
  comment,
  actions,
  reply,
  floorplan
};

export { styles };
