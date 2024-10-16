import { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { consolelog, resetTitleFavIcon } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFaceImage } from "@/redux/Action";
import { Camera } from "lucide-react";

type VideoConstraints = MediaTrackConstraints;
type TActionMessage = {
  turnLeft: string | null;
  turnRight: string | null;
  mouthOpen: string | null;
  center: string | null;
};

export default function Liveness() {
  resetTitleFavIcon();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [webcamInitialized, setWebcamInitialized] = useState(false);
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>();
  const [isCenter, setIsCenter] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<TActionMessage>({
    turnLeft: null,
    turnRight: null,
    mouthOpen: null,
    center: null,
  });
  const color = useRef<string>("gray");
  let trackIsCenter = false;
  const [isTurnLeft, setIsTurnLeft] = useState<boolean>(false);
  const [isTurnRight, setIsTurnRight] = useState<boolean>(false);
  const [isMouthOpen, setIsMouthOpen] = useState<boolean>(false);

  const loadModels = async () => {
    // consolelog("Loading face-api.js models...");
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    setIsModelLoaded(true);
    // consolelog("Models loaded");
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

  const detectFaces = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video && isModelLoaded) {
      const video = webcamRef.current.video as HTMLVideoElement;

      // Ensure the video is ready
      if (video.readyState === 4) {
        // HAVE_ENOUGH_DATA
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const dims = faceapi.matchDimensions(canvas, video, true);
          let circleBox = undefined;

          // Clear the canvas before drawing
          const ctx = canvas.getContext("2d");
          if (ctx) {
            // consolelog("Clearing canvas...");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a white rectangle covering the entire canvas
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Set the composite operation to 'destination-out' to create a hole effect
            ctx.globalCompositeOperation = "destination-out";

            // Draw a circle in the center
            const centerX = dims.width / 2;
            const centerY = dims.height / 2;
            const radius = 100; // Static radius for the circle
            consolelog(dims);

            // Calculate circle's bounding box
            const circleWidth = radius * 2;
            const circleHeight = radius * 2;
            const circleX = centerX - radius;
            const circleY = centerY - radius;
            circleBox = [circleX, circleY, circleWidth, circleHeight];

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill(); // Fill the circle to create the hole

            // Reset the composite operation to default
            ctx.globalCompositeOperation = "source-over";

            // Optionally add a border around the hole
            ctx.strokeStyle = color.current;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.stroke();
          }

          // consolelog("Detecting faces...");
          const options = new faceapi.TinyFaceDetectorOptions();
          const result = await faceapi
            .detectSingleFace(video, options)
            .withFaceLandmarks();

          if (result) {
            const { x, y, width, height } = result.detection.box;
            if (ctx) {
              ctx.strokeStyle = "blue";
              ctx.lineWidth = 2;
              ctx.strokeRect(x, y, width, height);
            }
            // consolelog(x, y, width, height);
            if (circleBox) {
              const slippageX = 15;
              const slippageY = 20;
              if (
                circleBox[0] + slippageX > x &&
                circleBox[0] - slippageX < x &&
                circleBox[1] + slippageY > y &&
                circleBox[1] - slippageY < y
              ) {
                // consolelog("Center");
                color.current = "green";
                trackIsCenter = true;
                setIsCenter(true);
              } else {
                // consolelog("Not center");
                color.current = "gray";
                trackIsCenter = false;
                setIsCenter(false);
              }
              // consolelog(circleBox[0] + slippageX, circleBox[0] - slippageX, x);
              // consolelog(circleBox[1] + slippageY, circleBox[1] - slippageY, y);
            }

            const leftEye = result.landmarks.getLeftEye();
            const rightEye = result.landmarks.getRightEye();
            const leftEAR = calculateEAR(leftEye);
            const rightEAR = calculateEAR(rightEye);
            if (rightEAR > 0.35 && trackIsCenter) {
              consolelog("Turned left");
              setIsTurnLeft(true);
            }
            if (leftEAR > 0.35 && trackIsCenter) {
              consolelog("Turned right");
              setIsTurnRight(true);
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
            if (mouthDist > 20 && trackIsCenter) {
              consolelog("Mouth opened");
              setIsMouthOpen(true);
            }
          } else {
            // consolelog("No face detected");
          }
        }
      } else {
        consolelog("Video not ready, state:", video.readyState);
      }
    } else {
      consolelog("Webcam or video not found, or model not loaded");
    }
  }, [isModelLoaded]);

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

  const handleNext = () => {
    if (isCenter && isMouthOpen && isTurnLeft && isTurnRight) {
      const srcImg = webcamRef.current?.getScreenshot();
      if (srcImg && srcImg !== null) {
        dispatch(setFaceImage(srcImg));
        consolelog(srcImg);
        // navigate("/authentication/signup/webcaminstructions");
      }
    }
    navigate("/authentication/signup/webcaminstructions");
  };

  useEffect(() => {
    loadModels();
    // consolelog(window.innerWidth, window.innerHeight);
    setVideoConstraints({
      width: window.innerWidth,
      height: window.innerHeight,
      facingMode: "user",
    });
  }, []);

  useEffect(() => {
    if (webcamRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;
      video.onloadeddata = () => {
        // consolelog("Webcam initialized");
        setWebcamInitialized(true);
      };
    }
  }, [webcamRef]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      detectFaces();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [detectFaces, isModelLoaded]);

  useEffect(() => {
    if (webcamRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;
      video.onloadeddata = () => {
        setWebcamInitialized(true);
      };
    }
  }, [webcamRef]);

  return (
    <>
      <div className="relative w-screen h-screen">
        {!webcamInitialized && <p>Loading webcam...</p>}
        <Webcam
          className="w-full h-full absolute top-0 left-0"
          ref={webcamRef}
          videoConstraints={videoConstraints}
          screenshotFormat="image/png"
          audio={false}
          // onUserMedia={() => consolelog("Webcam stream started")}
          // onUserMediaError={(err) => consolelog("Webcam error", err)}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full absolute top-0 left-0"
        />
        <div className="absolute bottom-0 left-0 w-full flex flex-col space-y-6 justify-center items-center pb-8">
          <h1 className="text-xl font-bold text-blue-500">{getMessage()}</h1>
          <Camera
            className="w-10 h-10 p-2 bg-gray-400 rounded-full hover:bg-gray-800 cursor-pointer"
            onClick={() => handleNext()}
            color="white"
          />
        </div>
      </div>
    </>
  );
}
