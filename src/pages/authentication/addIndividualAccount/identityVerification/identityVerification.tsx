import thaiid from "@assets/identityVerification/thaiid.png";
import ndid from "@assets/identityVerification/ndid.png";
import { Card } from "@/components/ui/Card";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { getCookies } from "@/lib/cookies";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/api/axios";
import {
  clearIndividualData,
  initIndividualData,
  setTestCorporateData,
} from "@/redux/Action";
import { useEffect, useState } from "react";
import Alert from "@/components/alert/Alert";
import { forceResetNameFavIcon } from "@/lib/utils";

export default function IdentityVerification() {
  forceResetNameFavIcon();
  const navigate = useNavigate();
  const token = getCookies();
  const dispatch = useDispatch();

  const fetchIndividualData = async (AccountID: string) => {
    try {
      console.log(AccountID);
      const res = await axios.post("/api/v1/individual/list", {
        accountId: AccountID,
      });
      dispatch(initIndividualData(res.data[0]));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const individualData = useSelector((state: any) => state.individualData);

  useEffect(() => {
    const cidValue = localStorage.getItem("cid");
    if (cidValue) {
      fetchIndividualData(cidValue || "");
    } else {
      console.log("cid not found");
    }
  }, [token, dispatch]);

  const [alertVisible, setAlertVisible] = useState(false);
  const handleClose = () => {
    if (alertType === "success") {
      setAlertVisible(false);
      navigate("/authentication/login");
      dispatch(clearIndividualData());
      localStorage.clear();
    }
    setAlertVisible(false);
  };

  const [alertType, setAlertType] = useState("");
  // const [alertMessage,setAlertMessage] = useState("");

  const handleNdid = async () => {
    let body = {
      ndid: true,
      cid: localStorage.getItem("cid"),
    };
    dispatch(setTestCorporateData(body));
    console.log("ndid choosed : ", body);
    try {
      if (individualData?.thaid || individualData?.ndid) {
        const res = await axios.post(
          "/api/v1/individual/update/ndidthaid",
          body
        );
        if (res.status === 200) {
          console.log("update ndid success :", res);
          setAlertVisible(true);
          setAlertType("success");
          //  setAlertMessage("Thanks for your submission")
        } else {
          console.log("update ndid not success :", res);
          setAlertVisible(true);
          setAlertType("error");
          // setAlertMessage("please try again")
        }
      } else {
        const res = await axios.post("/api/v1/individual/ndidthaid", body, {});
        if (res.status === 200) {
          console.log("save ndid success :", res);
          setAlertVisible(true);
          setAlertType("success");
          //  setAlertMessage("Thanks for your submission")
        } else {
          console.log("save ndid not success :", res);
          setAlertVisible(true);
          setAlertType("error");
          // setAlertMessage("please try again")
        }
      }
    } catch (error) {
      console.log("save ndid not success :", error);
      setAlertVisible(true);
      setAlertType("error");
      // setAlertMessage("please try again")
    }
  };
  const handlethaiid = async () => {
    let body = {
      thaid: true,
      cid: localStorage.getItem("cid"),
    };
    dispatch(setTestCorporateData(body));
    console.log("thaid choosed : ", body);
    try {
      if (individualData?.thaid || individualData?.ndid) {
        const res = await axios.post(
          "/api/v1/individual/update/ndidthaid",
          body
        );
        if (res.status === 200) {
          console.log("update thaid success :", res);
          setAlertVisible(true);
          setAlertType("success");
          //  setAlertMessage("Thanks for your submission")
        } else {
          console.log("update thaid not success :", res);
          setAlertVisible(true);
          setAlertType("error");
          // setAlertMessage("please try again")
        }
      } else {
        const res = await axios.post("/api/v1/individual/ndidthaid", body, {});
        if (res.status === 200) {
          console.log("save thaid success :", res);
          setAlertVisible(true);
          setAlertType("success");
          //  setAlertMessage("Thanks for your submission")
        } else {
          console.log("save thaid not success :", res);
          setAlertVisible(true);
          setAlertType("error");
          // setAlertMessage("please try again")
        }
      }
    } catch (error) {
      console.log("save ndid not success :", error);
      setAlertVisible(true);
      setAlertType("error");
      // setAlertMessage("please try again")
    }
  };

  const ConfirmNdidBtn = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="bg-primary p-2 rounded-md text-white hover:bg-primary/90 w-28">
          ตกลง
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>คุณแน่ใจใช่ไหม?</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                หมายเหตุ ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม.
                จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center justify-center">
            <AlertDialogCancel className="w-32">ปิด</AlertDialogCancel>
            <AlertDialogAction className="w-32" onClick={handleNdid}>
              ยืนยัน
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const ConfirmThaidBtn = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="bg-primary p-2 rounded-md text-white hover:bg-primary/90 w-28">
          ตกลง
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>คุณแน่ใจใช่ไหม?</AlertDialogTitle>
            <AlertDialogDescription>
              <span>
                หมายเหตุ ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม.
                จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex items-center justify-center">
            <AlertDialogCancel className="w-32">ปิด</AlertDialogCancel>
            <AlertDialogAction className="w-32" onClick={handlethaiid}>
              ยืนยัน
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center p-8 pt-16 space-y-8 md:mx-16">
        {alertVisible && (
          <Alert
            type={alertType}
            onClose={handleClose}
            data-testid="alertResponse"
          />
        )}
        <div className="flex flex-col items-center text-slate-800">
          <span className="font-bold text-2xl">
            ท่านสามารถเลือก "ยืนยันตัวตน" ดังนี้
          </span>
          <span className="text-lg">
            กรุณาเลือกช่องทางการยืนยันตัวตนที่ท่านสะดวกอย่างใดอย่างหนึ่ง
          </span>
          <span className="text-lg">
            หลังการยืนยันตัวตน ท่านจะได้รับ Username & Password ผ่านทางอีเมลล์
          </span>
        </div>
        <Card className="flex flex-col md:flex-row md:items-center md:space-x-4 p-4 lg:w-3/4 bg-white">
          <div className="md:m-8 max-w-32 max-h-32 flex flex-shrink-0">
            <img src={ndid} alt="NDID" />
          </div>
          <div className="flex flex-col">
            <span className="text-slate-800 font-bold py-4 text-2xl ">
              1.NDID
            </span>
            <span>
              1. ยืนยันตัวตนและสมัคร NDID
              กับธนาคารที่ท่านใช้บริการเรียบร้อยแล้วเท่านั้น
            </span>
            <span>2. ทำรายการให้สำเร็จภายใน 1 ชม.</span>
            <span className="p-4 pl-0 md:pl-4">
              <span className="underline font-bold pr-4">หมายเหตุ</span>
              ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม.
              จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้
            </span>
            <div className="flex justify-start py-4">
              <ConfirmNdidBtn />
            </div>
          </div>
        </Card>

        <Card className="flex flex-col md:flex-row md:items-center md:space-x-4 p-4 lg:w-3/4 bg-white">
          <div className="md:m-8 max-w-32 max-h-32 flex flex-shrink-0">
            <img src={thaiid} alt="THAIID" />
          </div>

          <div className="flex flex-col">
            <span className="text-slate-800 font-bold py-4 text-2xl ">
              2.THAID
            </span>
            <span>1. ยืนยันตัวตนผ่าน THAID</span>
            <span>2. ทำรายการให้สำเร็จภายใน 1 วัน</span>
            <span className="p-4 pl-0 md:pl-4">
              <span className="underline font-bold pr-4">หมายเหตุ</span>
              ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม.
              จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้
            </span>
            <div className="flex justify-start py-4">
              <ConfirmThaidBtn />
            </div>
          </div>
        </Card>

        <Button onClick={() => navigate("/")} className="w-28">
          Done
        </Button>
        <div className="flex flex-col items-center space-y-2 lg:w-3/4 md:text-lg font-bold">
          <div className="flex justify-center">
            <span className="font-normal">สอบถามข้อมูลเพิ่มเติม</span>
          </div>
          <div className="flex space-x-4 md:flex-row flex-col md:space-x-4 items-center">
            <span className="flex items-center">
              <FaPhoneAlt />
              023456789
            </span>
            <span className="flex items-center">
              <MdEmail />
              callcenter@admin.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
