import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setIdCardImage } from "@/redux/Action";
import { useNavigate } from "react-router-dom";
import getImages from "@/common/imagesData";
import { consolelog, sleep } from "@/lib/utils";
import axios from "@/api/axios";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";

type VideoConstraints = MediaTrackConstraints;

export default function IDCardCapture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [_, setImageSrc] = useState<string | null | undefined>();
  const livenessOcr = useSelector((state: any) => state.livenessOcr);
  const [videoConstraints, setVideoConstraints] = useState<VideoConstraints>();
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    if (livenessOcr.idCardImage && livenessOcr.idCardImage !== null) {
      setImageSrc(livenessOcr.idCardImage);
    }
  }, []);

  const handleCapture = async () => {
    const srcImg = webcamRef.current?.getScreenshot();
    setImageSrc(srcImg);
    if (srcImg && srcImg !== null) {
      const cid = localStorage.getItem("cid") || "";
      const blob = await fetch(srcImg).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("cid", cid);
      formData.append("docType", "idCard");
      toast(<Loading />, { autoClose: false, closeOnClick: false });
      await axios
        .post("api/v1/document/openaccount/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          consolelog(res.data);
          dispatch(setIdCardImage(srcImg));
          toast.dismiss();
          await sleep();
          navigate("/authentication/signup/otpemailconfirm");
          // navigate("/authentication/signup/identityverification");
        })
        .catch((err) => {
          console.log(err);
          toast.dismiss();
        });
    }
    //TODO: remove link
    await sleep();
    navigate("/authentication/signup/otpemailconfirm");
    // navigate("/authentication/signup/identityverification");
  };

  useEffect(() => {
    const facingMode = isMobile ? "environment" : "user";
    setVideoConstraints({
      width: 480,
      height: 480,
      aspectRatio: 1,
      facingMode: {
        exact: facingMode,
      },
    });
  }, [width, height]);

  return (
    <div className="h-full w-full">
      <div className="w-[360px] h-[667px] mx-auto">
        <div className="py-4 md:py-10 md:space-y-8">
          <h1 className={height > 667 ? "py-2" : "hidden"}>
            โปรดอยู่ในที่แสงสว่างเพียงพอ หรือไม่มีแสงสะท้อน
          </h1>

          <div className={`relative w-[360px] h-[480px]`}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={videoConstraints}
              className="w-full h-full absolute top-0 object-cover"
            />
            <img
              src={getImages("verticalIdOvleray")}
              alt="ID Card Overlay"
              className="w-full h-full absolute top-0 object-contain"
            />
          </div>
          <h2 className={height > 667 ? "py-2" : "hidden"}>
            วางด้านหน้าบัตรประชาชนให้อยู่ในกรอบที่กำหนด และหลีกเลี่ยงแสงสะท้อน
            เห็นข้อมูลบนบัตรชัดเจน
          </h2>
          <div className="w-[360px] flex justify-center py-4">
            <Camera
              className="w-10 h-10 p-2 bg-gray-400 rounded-full hover:bg-gray-800 cursor-pointer"
              onClick={() => handleCapture()}
              color="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
