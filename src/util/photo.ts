import { getFaceImageData } from "./faceTracking";

const getClearPhoto = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#AAA";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
};

export const getFacePhotoFromVideo = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement
) => {
  try {
    let ctx = canvas.getContext("2d");

    const width = video.width;
    const height = video.height;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(video, 0, 0, width, height);

    const faceData = await getFaceImageData(canvas);
    canvas.width = faceData.width;
    canvas.height = faceData.height;

    ctx.putImageData(faceData, 0, 0);
    return canvas.toDataURL("image/png");
  } catch (error) {
    return getClearPhoto(canvas);
  }
};
