let actx = null;

export const getAudioContext = () => {
  if (actx === null) {
    actx = new AudioContext();
  }
  return actx;
};
