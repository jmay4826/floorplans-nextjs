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
