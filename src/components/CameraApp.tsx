import * as React from "react";
import { getFacePhotoFromVideo } from "../util/photo";
import { SelfieStream } from "./SelfieStream";

const VideoDimensions = {
  width: 640,
  height: 480
};

export const CameraApp = ({}) => {
  const [imgSrc, updateImgSrc] = React.useState("");

  const canvasRef = React.useRef<HTMLCanvasElement>();
  const videoRef = React.useRef<HTMLVideoElement>();

  let dimensions = VideoDimensions;

  const onReady = (video: HTMLVideoElement) => {
    videoRef.current = video;
    dimensions.width = video.videoWidth;
    dimensions.height = video.height;
  };

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    getFacePhotoFromVideo(videoRef.current, canvasRef.current).then(
      updateImgSrc
    );
  };

  return (
    <div>
      <SelfieStream {...dimensions} onReady={onReady} />
      <canvas {...dimensions} style={{ display: "none" }} ref={canvasRef} />
      <div>
        <img src={imgSrc} alt="Snap a photo to see it here" />
      </div>
      <button onClick={onClick}>Take a picture</button>
    </div>
  );
};
