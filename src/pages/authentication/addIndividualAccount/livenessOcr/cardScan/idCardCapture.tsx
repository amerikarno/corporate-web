import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setIdCardImage } from "@/redux/Action";
import { useNavigate } from "react-router-dom";
import getImages from "@/common/imagesData";

const layoutWidth = 514;
const layoutHeight = 326;

const videoConstraints = {
  width: layoutWidth,
  height: layoutHeight,
  facingMode: "user",
};

export default function IDCardCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null | undefined>();
  const livenessOcr = useSelector((state: any) => state.livenessOcr);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (livenessOcr.idCardImage && livenessOcr.idCardImage !== null) {
      setImageSrc(livenessOcr.idCardImage);
    }
  }, []);

  const handleCapture = () => {
    const srcImg = webcamRef.current?.getScreenshot();
    setImageSrc(srcImg);
    if (srcImg && srcImg !== null) {
      dispatch(setIdCardImage(srcImg));
    }
  };

  const handleSubmit = async () => {
    console.log(imageSrc);
    // console.log("face image", livenessOcr.faceImage);
    // console.log("id image", livenessOcr.idCardImage);
    // console.log("sent image to server");
    navigate(
      `${import.meta.env.BASE_URL}authentication/signup/identityverification`
    );
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="p-10 space-y-8 w-[514px]">
          <h1>โปรดอยู่ในที่แสงสว่างเพียงพอ หรือไม่มีแสงสะท้อน</h1>
          <div className="relative">
            <Webcam
              audio={false}
              width={layoutWidth}
              height={layoutHeight}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
            />
            <div className="absolute top-0">
              <img
                src={getImages("idOverlay")}
                alt="ID Card Overlay"
                width={layoutWidth}
                height={layoutHeight}
              />
            </div>
          </div>
          <h2>
            วางด้านหน้าบัตรประชาชนให้อยู่ในกรอบที่กำหนด และหลีกเลี่ยงแสงสะท้อน
            เห็นข้อมูลบนบัตรชัดเจน
          </h2>
          <div className="flex justify-center">
            <Camera className="w-10 h-10" onClick={() => handleCapture()} />
          </div>
          {/* {imageSrc && imageSrc !== null && (
        <div className="space-y-4">
          <img src={imageSrc} alt="screenshot" />
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      )} */}
          {
            <div className="flex justify-center">
              <Button className="text-white" onClick={() => handleSubmit()}>
                Next
              </Button>
            </div>
          }
          {/* {imageSrc && imageSrc !== null && (
        <div className="flex justify-center">
          <Button onClick={() => handleSubmit()}>Next</Button>
        </div>
      )} */}
        </div>
      </div>
    </div>
  );
}
