import { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { sleep } from "@/lib/utils";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setFaceImage } from "@/redux/Action";
import { Camera } from "lucide-react";
import axios from "@/api/axios";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";
import { pages } from "@/lib/constantVariables";

type VideoConstraints = MediaTrackConstraints;
type TActionMessage = {
  turnLeft: string | null;
  turnRight: string | null;
  mouthOpen: string | null;
  center: string | null;
};

export default function Liveness() {
  // const dispatch = useDispatch();
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
  // const [dim, setDim] = useState([0, 0]);

  const loadModels = async () => {
    // console.log("Loading face-api.js models...");
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    setIsModelLoaded(true);
    // console.log("Models loaded");
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
      return "Take a picture";
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
          let ellipseBox = undefined;

          // Clear the canvas before drawing
          const ctx = canvas.getContext("2d");
          if (ctx) {
            // console.log("Clearing canvas...");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set the opacity for the white filter
            ctx.globalAlpha = 0.9; // Set opacity between 0 (completely transparent) and 1 (completely opaque)
            // Draw a white rectangle covering the entire canvas
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Reset the opacity to full for the hole effect
            ctx.globalAlpha = 1.0;

            // Set the composite operation to 'destination-out' to create a hole effect
            ctx.globalCompositeOperation = "destination-out";

            // Draw a circle in the center
            const centerX = dims.width / 2;
            const centerY = dims.height / 2;
            const radiusX = dims.width * 0.2; // Horizontal radius for the ellipse
            const radiusY = dims.height * 0.3; // Vertical radius for the ellipse
            // setDim([dims.width, dims.height]);

            // Calculate circle's bounding box
            const ellipseWidth = radiusX * 2;
            const ellipseHeight = radiusY * 2;
            const ellipseX = centerX - radiusX;
            const ellipseY = centerY - radiusY;
            ellipseBox = [ellipseX, ellipseY, ellipseWidth, ellipseHeight];

            ctx.beginPath();
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.fill(); // Fill the circle to create the hole

            // Reset the composite operation to default
            ctx.globalCompositeOperation = "source-over";

            // Optionally add a border around the hole
            ctx.strokeStyle = color.current;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.stroke();
          }

          // console.log("Detecting faces...");
          const options = new faceapi.TinyFaceDetectorOptions();
          const result = await faceapi
            .detectSingleFace(video, options)
            .withFaceLandmarks();

          if (result) {
            const { x, width } = result.detection.box;
            // if (ctx) {
            //   ctx.strokeStyle = "blue";
            //   ctx.lineWidth = 2;
            //   ctx.strokeRect(x, y, width, height);
            // }
            // console.log(x, y, width, height);
            // console.log(ellipseBox);
            if (ellipseBox) {
              const slippage = 20;
              if (
                ellipseBox[0] + slippage > x &&
                ellipseBox[0] - slippage < x &&
                ellipseBox[2] + slippage > width &&
                ellipseBox[2] - slippage < width
              ) {
                // console.log("Center");
                color.current = "green";
                trackIsCenter = true;
                setIsCenter(true);
              } else {
                // console.log("Not center");
                color.current = "gray";
                trackIsCenter = false;
                setIsCenter(false);
              }
              // console.log(circleBox[0] + slippageX, circleBox[0] - slippageX, x);
              // console.log(circleBox[1] + slippageY, circleBox[1] - slippageY, y);
            }

            const leftEye = result.landmarks.getLeftEye();
            const rightEye = result.landmarks.getRightEye();
            const leftEAR = calculateEAR(leftEye);
            const rightEAR = calculateEAR(rightEye);
            if (rightEAR > 0.35 && trackIsCenter) {
              console.log("Turned left");
              setIsTurnLeft(true);
            }
            if (leftEAR > 0.35 && trackIsCenter) {
              console.log("Turned right");
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
              console.log("Mouth opened");
              setIsMouthOpen(true);
            }
          } else {
            // console.log("No face detected");
          }
        }
      } else {
        console.log("Video not ready, state:", video.readyState);
      }
    } else {
      console.log("Webcam or video not found, or model not loaded");
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

  const handleNext = async () => {
    if (isCenter && isMouthOpen && isTurnLeft && isTurnRight) {
      const srcImg = webcamRef.current?.getScreenshot();
      if (srcImg && srcImg !== null) {
        const registerId = localStorage.getItem("registerId") || "";
        const blob = await fetch(srcImg).then((res) => res.blob());
        const formData = new FormData();
        formData.append("file", blob);
        formData.append("registerId", registerId);
        formData.append("docType", "faceCompare");
        formData.append("pageId", pages[4].id.toString());
        const loadingToast = toast(<Loading />, {
          autoClose: false,
          closeOnClick: false,
        });
        await axios
          .post("api/v1/document/openaccount/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(async (res) => {
            console.log(res.data);
            // dispatch(setFaceImage(srcImg));
            toast.dismiss();
            await sleep();
            navigate("/authentication/signup/webcaminstructions");
          })
          .catch((err) => {
            console.log(err);
            toast.dismiss(loadingToast);
            toast.error("Network Error while uploading image");
          });

        console.log(srcImg);
      }
    }
    //TODO: remove link
    await sleep();
    navigate("/authentication/signup/webcaminstructions");
  };

  useEffect(() => {
    loadModels();
    setVideoConstraints({
      width: 480,
      height: 480,
      aspectRatio: 1,
    });
  }, []);

  useEffect(() => {
    if (webcamRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;
      video.onloadeddata = () => {
        // console.log("Webcam initialized");
        setWebcamInitialized(true);
      };
    }
  }, [webcamRef]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      detectFaces();
    }, 200);

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
    <div className="w-full h-full flex flex-col justify-center items-center space-y-4 py-4">
      <div className="relative w-[360px] h-[480px]">
        {!webcamInitialized && <p>Loading webcam...</p>}
        <Webcam
          className="w-full h-full absolute top-0 left-0 object-cover"
          ref={webcamRef}
          videoConstraints={videoConstraints}
          screenshotFormat="image/png"
          audio={false}
          // onUserMedia={() => console.log("Webcam stream started")}
          // onUserMediaError={(err) => console.log("Webcam error", err)}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full absolute top-0 left-0 object-cover"
        />
        {/* <div className="absolute bottom-0 left-0 w-full flex flex-col space-y-6 justify-center items-center pb-8">
          <h1 className="text-xl font-bold text-black">{`dimension (w x h) : ${dim[0]} x ${dim[1]}`}</h1>
          <h1 className="text-xl font-bold text-black">{getMessage()}</h1>
          <Camera
            className="w-10 h-10 p-2 bg-gray-400 rounded-full hover:bg-gray-800 cursor-pointer"
            onClick={() => handleNext()}
            color="white"
          />
        </div> */}
      </div>
      {/* <h1 className="text-xl font-bold text-black">{`dimension (w x h) : ${dim[0]} x ${dim[1]}`}</h1> */}
      {webcamRef.current?.video?.readyState === 4 && (
        <h1 className="text-xl font-bold text-black">{getMessage()}</h1>
      )}
      <div className="p-4">
        <Camera
          className="w-10 h-10 p-2 bg-gray-400 rounded-full hover:bg-gray-800 cursor-pointer"
          onClick={() => handleNext()}
          color="white"
        />
      </div>
    </div>
  );
}
