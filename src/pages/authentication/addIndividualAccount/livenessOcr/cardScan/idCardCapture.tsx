import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setIdCardImage } from "@/redux/Action";
import { useNavigate } from "react-router-dom";
import getImages from "@/common/imagesData";
import { useWindowSize } from "@/lib/useWindowSize";
import { sleep } from "@/lib/utils";

type TScreen = {
  width: number;
  height: number;
};
export default function IDCardCapture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [_, setImageSrc] = useState<string | null | undefined>();
  const livenessOcr = useSelector((state: any) => state.livenessOcr);
  const [screenLayout, setScreenLayout] = useState<TScreen>({
    width: 326,
    height: 514,
  });
  const { width, height } = useWindowSize();
  const [videoConstraints, setVideoConstraints] = useState({
    width: screenLayout.width,
    height: screenLayout.height,
    facingMode: "user",
  });

  useEffect(() => {
    if (livenessOcr.idCardImage && livenessOcr.idCardImage !== null) {
      setImageSrc(livenessOcr.idCardImage);
    }
  }, []);

  const handleCapture = async () => {
    const srcImg = webcamRef.current?.getScreenshot();
    setImageSrc(srcImg);
    if (srcImg && srcImg !== null) {
      dispatch(setIdCardImage(srcImg));
    }
    await sleep(500);
    navigate("/authentication/signup/identityverification");
  };

  // const handleSubmit = async () => {
  //   // console.log(imageSrc);
  //   // console.log("face image", livenessOcr.faceImage);
  //   // console.log("id image", livenessOcr.idCardImage);
  //   // console.log("sent image to server");
  //   navigate("/authentication/signup/identityverification");
  // };

  useEffect(() => {
    if (width >= 600) {
      setVideoConstraints({
        width: 514,
        height: 326,
        facingMode: "user",
      });
      setScreenLayout({
        width: 514,
        height: 326,
      });
    } else {
      setVideoConstraints({
        width: 326,
        height: 514,
        facingMode: "user",
      });
      setScreenLayout({ width: 326, height: 514 });
    }
    console.log(width, height);
  }, [width, height]);

  return (
    <div className="flex justify-center h-screen w-full">
      <div className="max-w-[525px]">
        <div className="lg:p-10 lg:space-y-8">
          <h1
            className={height >= 768 ? "py-4 w-[326px] md:w-[514px]" : "hidden"}
          >
            โปรดอยู่ในที่แสงสว่างเพียงพอ หรือไม่มีแสงสะท้อน
          </h1>

          <div
            className={`relative ${
              width >= 600 ? "w-[514px] h-[326px]" : "w-[326px] h-[514px]"
            }`}
          >
            <Webcam
              audio={false}
              width={screenLayout.width}
              height={screenLayout.height}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
            />
            <img
              src={
                width >= 600
                  ? getImages("idOverLay")
                  : getImages("verticalIdOvleray")
              }
              alt="ID Card Overlay"
              width={screenLayout.width}
              height={screenLayout.height}
              className="absolute top-0"
            />
          </div>
          <h2
            className={height >= 768 ? "py-4 w-[326px] md:w-[514px]" : "hidden"}
          >
            วางด้านหน้าบัตรประชาชนให้อยู่ในกรอบที่กำหนด และหลีกเลี่ยงแสงสะท้อน
            เห็นข้อมูลบนบัตรชัดเจน
          </h2>
          <div className="flex justify-center py-2">
            <Camera
              className="w-10 h-10 p-2 bg-gray-400 rounded-full hover:bg-gray-800 cursor-pointer"
              onClick={() => handleCapture()}
              color="white"
            />
          </div>
          {/* <div className="flex justify-center">
            <Button className="text-white" onClick={() => handleSubmit()}>
              Next
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
