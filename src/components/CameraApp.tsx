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

  const onReady = (video: HTMLVideoElement) => {
    videoRef.current = video;
  };

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    getFacePhotoFromVideo(videoRef.current, canvasRef.current).then(
      updateImgSrc
    );
  };

  return (
    <div>
      <SelfieStream {...VideoDimensions} onReady={onReady} />
      <canvas
        {...VideoDimensions}
        style={{ display: "none" }}
        ref={canvasRef}
      />
      <div>
        <img src={imgSrc} alt="Snap a photo to see it here" />
      </div>
      <button onClick={onClick}>Take a picture</button>
    </div>
  );
};
