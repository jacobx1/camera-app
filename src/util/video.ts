export const getSelfieMediaStream = () =>
  window.navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user"
    },
    audio: false
  });
