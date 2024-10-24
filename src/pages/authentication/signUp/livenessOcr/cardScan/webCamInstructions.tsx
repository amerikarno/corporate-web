import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../components/ui/alert-dialog";
import getImages from "@/common/imagesData";

export function CardWebcamInstructions() {
  const navigate = useNavigate();

  const CameraSetting = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>ที่นี่</AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogTitle>วิธีการตั้งค่าเปิดกล้อง</AlertDialogTitle>
          <div className="space-y-6">
            <div>
              <p>ㆍสำหรับ IOS (IPhone/iPad)</p>
              <p>
                โดยเข้าไปที่การตั้งค่า (Settings) เลือก Safari &gt;
                การเข้าถึงกล้องและไมโครโฟน (Camera &amp; Microphone) &gt; เลือก
                อนุญาต (Allow)
              </p>
            </div>
            <div>
              <p>ㆍสำหรับ Android (Google Chrome)</p>
              <p>
                ไปที่ Google Chrome คลิกที่ สัญลักษณ์ ... มุมขวาบน/ล่าง &gt;
                เลือกการตั้งค่า (Settings) &gt; การตั้งค่าเว็บไซต์ (Site
                Setting) &gt; กล้องถ่ายรูป (Camera) &gt; เลือก อนุญาต (Allow)
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full lg:py-4 xl:py-8">
        <Card className="border-none shadow-none mx-auto w-full lg:w-4/5 xl:w-1/2 bg-white">
          <CardContent>
            <h1 className="py-2 font-bold">
              ถ่ายรูปบัตรประชาชนเพื่อประกอบการยืนยันตัวตน
            </h1>
            <div className="">
              <ol>
                <li>1.จัดบัตรประชาชนให้อยู่ในกรอบ</li>
                <li>2.อยู่ในพื้นที่ที่มีแสงสว่างเพียงพอ</li>
                <li>3.ระวังแสงสะท้อนบนบัตรประชาชนขณะถ่ายบัตร</li>
              </ol>
              <div className="my-6">
                <img src={getImages("idCardPic")} alt="" />
              </div>
              <div className="py-4">
                <p className="font-bold">หมายเหตุ</p>
                <ol>
                  <li>กรุณากด "ตกลง" เพื่อเปิดกล้อง</li>
                  <li>
                    หากท่านไม่สามารถถ่ายรูปได้ กรุณาตรวจสอบการตั้งค่า
                    <span className="text-blue-500 px-1 hover:cursor-pointer">
                      <CameraSetting />
                    </span>
                  </li>
                </ol>
              </div>
              <Button
                type="button"
                onClick={() => navigate("/authentication/signup/cardcapture")}
              >
                ตกลง
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
