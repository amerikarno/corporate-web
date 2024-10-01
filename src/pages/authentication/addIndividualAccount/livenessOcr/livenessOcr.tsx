import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Camera } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFaceImage } from "@/redux/Action";
import { sleep } from "@/lib/utils";

export default function Liveness() {
  type TActionMessage = {
    turnLeft: string | null;
    turnRight: string | null;
    mouthOpen: string | null;
    center: string | null;
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [isTurnLeft, setIsTurnLeft] = useState<boolean>(false);
  const [isTurnRight, setIsTurnRight] = useState<boolean>(false);
  const [isMouthOpen, setIsMouthOpen] = useState<boolean>(false);
  const [isCenter, setIsCenter] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null | undefined>(null);
  const [actionMessage, setActionMessage] = useState<TActionMessage>({
    turnLeft: null,
    turnRight: null,
    mouthOpen: null,
    center: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const livenessOcrFiles = useSelector((state: any) => state.livenessOcr);
  let trackIsCenter = false;
  let trackIsLeft = false;
  let trackIsRight = false;
  let trackIsMouthOpen = false;
  let isCapture = false;
  const aspectRatio = 4 / 3;

  let customerCode = 90000001;

  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setIsModelsLoaded(true);
    };

    if (livenessOcrFiles.faceImage && livenessOcrFiles.faceImage !== null) {
      setImage(livenessOcrFiles.faceImage);
    }

    loadModels();
    console.log(image);
  }, []);

  useEffect(() => {
    if (stream) {
      const track = stream.getVideoTracks()[0];
      track.onended = () => {
        console.log("Video track ended");
        setStream(null);
      };
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    if (isModelsLoaded) {
      startVideo();
    }
  }, [isModelsLoaded]);

  const startVideo = async () => {
    const w = screenWidth > 360 ? 360 : screenWidth;
    const h = screenWidth > 360 ? 270 : screenWidth / aspectRatio;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: w,
          height: h,
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStream(stream);
      }
    } catch (error) {
      console.error("Error accessing webcam: ", error);
    }
  };

  const faceDetect = async () => {
    // console.log(trackIsCenter, trackIsLeft, trackIsRight, trackIsMouthOpen);
    if (
      trackIsCenter &&
      trackIsLeft &&
      trackIsRight &&
      trackIsMouthOpen &&
      isCapture === false
    ) {
      await sleep(1000);
      capture();
    }

    if (videoRef.current) {
      const options = new faceapi.TinyFaceDetectorOptions();
      const result = await faceapi
        .detectSingleFace(videoRef.current, options)
        .withFaceLandmarks();

      if (result) {
        const leftEye = result.landmarks.getLeftEye();
        const rightEye = result.landmarks.getRightEye();
        const leftEAR = calculateEAR(leftEye);
        const rightEAR = calculateEAR(rightEye);
        if (rightEAR > 0.4 && trackIsCenter) {
          console.log("Turned left");
          setIsTurnLeft(true);
          trackIsLeft = true;
        }
        if (leftEAR > 0.4 && trackIsCenter) {
          console.log("Turned right");
          setIsTurnRight(true);
          trackIsRight = true;
        }

        const mouth = result.landmarks.getMouth();
        const mouthDist = mouthDistance([
          mouth[13],
          mouth[14],
          mouth[15],
          mouth[17],
          mouth[18],
          mouth[19],
        ]);
        if (mouthDist > 30 && trackIsCenter) {
          console.log("Mouth opened");
          setIsMouthOpen(true);
          trackIsMouthOpen = true;
        }

        // drawFaceLandmark(result);
        drawStaticEllipse(result);
      }
    }

    requestAnimationFrame(faceDetect);
  };

  const handleVideoPlay = () => {
    faceDetect();
  };

  const capture = async () => {
    if (videoRef.current) {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Draw the current video frame on the canvas
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert canvas to Blob
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a File from the Blob
            const file = new File(
              [blob],
              `${customerCode}-face-${Date.now()}.png`,
              {
                type: "image/png",
              }
            );

            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setImage(dataUrl);
                dispatch(setFaceImage(dataUrl));
              };
              reader.readAsDataURL(file);
              // setFile(file);
              isCapture = true;
            }
          }
        }, "image/png");
      }
    }
  };

  const calculateEAR = (eye: faceapi.Point[]) => {
    const p2_p6 = Math.sqrt(
      Math.pow(eye[1].x - eye[5].x, 2) + Math.pow(eye[1].y - eye[5].y, 2)
    );
    const p3_p5 = Math.sqrt(
      Math.pow(eye[2].x - eye[4].x, 2) + Math.pow(eye[2].y - eye[4].y, 2)
    );
    const p1_p4 = Math.sqrt(
      Math.pow(eye[0].x - eye[3].x, 2) + Math.pow(eye[0].y - eye[3].y, 2)
    );
    const EAR = (p2_p6 + p3_p5) / (2.0 * p1_p4);
    return EAR;
  };

  const mouthDistance = (mp: faceapi.Point[]) => {
    const p1_p4 = Math.sqrt(
      Math.pow(mp[0].x - mp[3].x, 2) + Math.pow(mp[0].y - mp[3].y, 2)
    );
    const p2_p5 = Math.sqrt(
      Math.pow(mp[1].x - mp[4].x, 2) + Math.pow(mp[1].y - mp[4].y, 2)
    );
    const p3_p6 = Math.sqrt(
      Math.pow(mp[2].x - mp[5].x, 2) + Math.pow(mp[2].y - mp[5].y, 2)
    );

    const mouthDistance = (p1_p4 + p2_p5 + p3_p6) / 3.0;
    return mouthDistance;
  };

  // const drawFaceLandmark = (
  //   result: faceapi.WithFaceLandmarks<{
  //     detection: faceapi.FaceDetection;
  //   }>
  // ) => {
  //   const ctx = canvasRef2.current?.getContext("2d");
  //   if (ctx && videoRef.current) {
  //     // Clear the previous drawings
  //     ctx.clearRect(
  //       0,
  //       0,
  //       canvasRef2.current!.width,
  //       canvasRef2.current!.height
  //     );

  //     // Resize canvas to match video dimensions
  //     faceapi.matchDimensions(canvasRef2.current!, {
  //       width: videoRef.current.videoWidth,
  //       height: videoRef.current.videoHeight,
  //     });

  //     const resizedResults = faceapi.resizeResults(result, {
  //       width: videoRef.current.videoWidth,
  //       height: videoRef.current.videoHeight,
  //     });

  //     // facelandmarks
  //     faceapi.draw.drawFaceLandmarks(canvasRef2.current!, resizedResults);
  //     // face box
  //     faceapi.draw.drawDetections(canvasRef2.current!, resizedResults);
  //   }
  // };

  const drawStaticEllipse = (
    detections: faceapi.WithFaceLandmarks<{
      detection: faceapi.FaceDetection;
    }>
  ) => {
    if (screenWidth > 360) {
      screenWidth = 360;
      screenHeight = 270;
    } else {
      screenHeight = screenWidth / aspectRatio;
    }

    // Resize canvas to match screen dimensions
    if (videoRef && videoRef.current !== null && canvasRef.current !== null) {
      faceapi.matchDimensions(canvasRef.current, {
        width: screenWidth,
        height: screenHeight,
      });
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx && ctx !== null && canvas && canvas !== null) {
      // Clear the previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = "rgba(255,255, 255, 1.0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ellipse in the center of the screen
      const centerX = screenWidth / 2;
      const centerY = screenHeight / 2;
      const ellipseWidth = screenWidth * 0.15;
      const ellipseHeight = screenHeight * 0.3;

      const box = detections.detection.box;
      const faceCenterX = box.x + box.width / 2;
      const faceCenterY = box.y + box.height / 2;

      let color = "green";
      const faceDis = Math.sqrt(
        Math.pow(
          detections.landmarks.positions[0].x -
            detections.landmarks.positions[16].x,
          2
        ) +
          Math.pow(
            detections.landmarks.positions[0].y -
              detections.landmarks.positions[16].y,
            2
          )
      );

      if (
        Math.abs(faceCenterX - centerX) < 30 &&
        Math.abs(faceCenterY - 30 - centerY) < 30 &&
        Math.abs(faceDis - ellipseWidth * 2) < 20
      ) {
        color = "green";
        setIsCenter(true);
        trackIsCenter = true;
      } else {
        color = "black";
        setIsCenter(false);
        trackIsCenter = false;
      }

      // Set composite mode to 'destination-out' to cut out the ellipse area
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        ellipseWidth,
        ellipseHeight,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      // Reset composite mode to default
      ctx.globalCompositeOperation = "source-over";

      // Draw ellipse border
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        centerY,
        ellipseWidth,
        ellipseHeight,
        0,
        0,
        2 * Math.PI
      );
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  };

  const takePhoto = () => {
    if (isCenter && isMouthOpen && isTurnLeft && isTurnRight) {
      console.log("take a photo");
      capture();
    } else {
      console.log("actions incomplete");
    }
  };

  const getMessage = () => {
    if (!isCenter) {
      actionMessage.center === null
        ? setActionMessage((prevState) => ({
            ...prevState,
            center: "please center",
          }))
        : null;
      return "please put your face in center";
    } else if (!isTurnLeft) {
      actionMessage.turnLeft === null
        ? setActionMessage((prevState) => ({
            ...prevState,
            turnLeft: "please turn left",
          }))
        : null;
      return "please turn left";
    } else if (!isTurnRight) {
      actionMessage.turnRight === null
        ? setActionMessage((prevState) => ({
            ...prevState,
            turnRight: "please turn right",
          }))
        : null;
      return "please turn right";
    } else if (!isMouthOpen) {
      actionMessage.mouthOpen === null
        ? setActionMessage((prevState) => ({
            ...prevState,
            mouthOpen: "please open mouth",
          }))
        : null;
      return "please open your mouth";
    } else {
      return null;
    }
  };

  const handleSubmit = async () => {
    navigate("/authentication/signup/webcaminstructions");
  };

  if (!isModelsLoaded) {
    return <p>Loading models...</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-[360px]">
        <div className="relative w-fit h-[270px]">
          <video
            ref={videoRef}
            onPlay={handleVideoPlay}
            className={`${isModelsLoaded ? "block" : "hidden"}`}
            width="360"
            height="270"
            autoPlay
            muted
          />
          <div className="absolute top-0 left-0">
            <canvas ref={canvasRef} className="" />
            {/* <canvas ref={canvasRef2} className="" /> */}
          </div>
        </div>

        {isModelsLoaded && (
          <div
            className={`${
              innerHeight >= 768 ? "py-10" : ""
            } w-[360px] flex justify-center text-green-500 text-xl font-bold`}
          >
            {getMessage()}
          </div>
        )}

        {isModelsLoaded && (
          <div
            className={`${
              innerHeight >= 768 ? "py-10" : "py-2"
            } w-[360px] flex justify-center`}
            onClick={() => takePhoto()}
          >
            <Camera className="w-10 h-10" />
          </div>
        )}
      </div>
    </div>
  );
}
