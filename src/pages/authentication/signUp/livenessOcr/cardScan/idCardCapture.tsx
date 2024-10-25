import { useRef } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { setIdCardImage } from "@/redux/Action";
import { useNavigate } from "react-router-dom";
import getImages from "@/common/imagesData";
import { sleep } from "@/lib/utils";
import axios from "@/api/axios";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import { pages } from "@/lib/constantVariables";

export default function IDCardCapture() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  // const [_, setImageSrc] = useState<string | null | undefined>();
  // const livenessOcr = useSelector((state: any) => state.livenessOcr);
  const height = window.innerHeight;

  // useEffect(() => {
  //   if (livenessOcr.idCardImage && livenessOcr.idCardImage !== null) {
  //     setImageSrc(livenessOcr.idCardImage);
  //   }
  // }, []);

  const handleCapture = async () => {
    const srcImg = webcamRef.current?.getScreenshot();
    // setImageSrc(srcImg);
    if (srcImg && srcImg !== null) {
      const registerId = localStorage.getItem("registerId") || "";
      const blob = await fetch(srcImg).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("registerId", registerId);
      formData.append("docType", "idCard");
      formData.append("pageId", pages[5].id.toString());
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
          // dispatch(setIdCardImage(srcImg));
          toast.dismiss();
          await sleep();
          navigate("/authentication/signup/otpemailconfirm");
          // navigate("/authentication/signup/identityverification");
        })
        .catch((err) => {
          console.log(err);
          toast.dismiss(loadingToast);
          toast.error("Network Error while uploading ID Card");
        });
    }
    //TODO: remove link
    await sleep();
    navigate("/authentication/signup/otpemailconfirm");
    // navigate("/authentication/signup/identityverification");
  };

  const videoConstraintsMobile: MediaTrackConstraints = {
    facingMode: "environment",
    width: 480,
    height: 640,
  };
  const videoConstraintsDestop: MediaTrackConstraints = {
    facingMode: "user",
    width: 480,
    height: 640,
  };

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
              videoConstraints={
                isMobile ? videoConstraintsMobile : videoConstraintsDestop
              }
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
