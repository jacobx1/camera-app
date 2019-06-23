import * as React from "react";
import { getSelfieMediaStream } from "../util/video";

type SelfStreamOnReady = (video: HTMLVideoElement) => void;

interface SelfieStreamProps {
  onReady: SelfStreamOnReady;
  width: number;
  height: number;
}

const setupVideoStreamEffect = (
  videoRef: React.MutableRefObject<HTMLVideoElement>,
  onReady: SelfStreamOnReady,
  setError: (isError: boolean) => void
) => {
  React.useEffect(() => {
    getSelfieMediaStream()
      .then(stream => {
        videoRef.current.addEventListener("canplay", () =>
          onReady(videoRef.current)
        );
        videoRef.current.srcObject = stream;
      })
      .catch(() => {
        setError(true);
      });
  }, []);
};

export const SelfieStream = ({ onReady, width, height }: SelfieStreamProps) => {
  const [isErrored, setIsErrored] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>();

  setupVideoStreamEffect(videoRef, onReady, setIsErrored);

  return isErrored ? (
    <h1>Need the camera for this</h1>
  ) : (
    <video
      width={width}
      height={height}
      autoPlay
      muted
      playsInline
      ref={videoRef}
    />
  );
};
