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

export default function IdentityVerification() {
  const navigate = useNavigate();

  const ConfirmBtn = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger className="bg-primary p-2 rounded-md text-white hover:bg-primary/90">
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
          <AlertDialogFooter>
            <AlertDialogCancel className="w-32">ปิด</AlertDialogCancel>
            <AlertDialogAction className="w-32">ยืนยัน</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="flex flex-col items-center p-8 pt-16 space-y-8 md:mx-16">
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
          {/* <CustomModal
            title="คุณแน่ใจมั้ย?"
            description="หมายเหตุ ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้"
            textClose="ยกเลิก"
            textSave="ยืนยัน"
            onSave={() => {}}
          /> */}
          <div className="flex justify-center py-4">
            <ConfirmBtn />
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
          {/* <CustomModal
            title="คุณแน่ใจมั้ย?"
            description="หมายเหตุ ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้"
            textClose="ยกเลิก"
            textSave="ยืนยัน"
            onSave={() => {}}
          /> */}
          <div className="flex justify-center py-4">
            <ConfirmBtn />
          </div>
        </div>
      </Card>

      <Button onClick={() => navigate("/")}>Done</Button>
      <div className="flex flex-col md:text-lg font-bold">
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
  );
}
