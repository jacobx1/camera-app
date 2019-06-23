import "tracking";
import "tracking/build/data/face-min";
import "tracking/build/data/eye-min";
import "tracking/build/data/mouth-min";

const tracker = new tracking.ObjectTracker(["face"]);

export const getFaceImageData = (canvas: HTMLCanvasElement) =>
  new Promise<ImageData>((resolve, reject) => {
    const ctx = canvas.getContext("2d");
    tracker.once("track", event => {
      if (event.data.length) {
        const faceRect = event.data[0];
        const face = ctx.getImageData(
          faceRect.x,
          faceRect.y,
          faceRect.width,
          faceRect.height
        );
        resolve(face);
      } else {
        reject();
      }
    });
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    tracker.track(pixels.data, pixels.width, pixels.height);
  });
