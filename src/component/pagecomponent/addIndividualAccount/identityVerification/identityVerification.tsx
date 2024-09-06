import thaiid from "./assets/thaiid.png"
import ndid from "./assets/ndid.png"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Swal, { SweetAlertResult } from "sweetalert2";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog"
import PageHeader from "@/layout/layoutsection/pageHeader/pageHeader";

export default function IdentityVerification() {

  function Style2() {
		Swal.fire({
			title: 'คุณแน่ใจมั้ย?',
			text: "หมายเหตุ ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#5e76a6',
			cancelButtonColor: '#ef4444',
			confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
		  }).then((result) => {
			if (result.isConfirmed) {
			  Swal.fire(
				'เลือกสำเร็จ',
				'',
				'success'
			  )
			}
		  })
	 }

  return (
    <div className="flex flex-col items-center p-8 pt-16 space-y-8 md:mx-16">
      <PageHeader currentpage="" activepage="Identity Verification" mainpage="Waiting for Identity Verified" />
      <div className="flex flex-col items-center text-slate-800">
        <span className="font-bold text-2xl">ท่านสามารถเลือก "ยืนยันตัวตน" ดังนี้</span>
        <span className="text-lg">กรุณาเลือกช่องทางการยืนยันตัวตนที่ท่านสะดวกอย่างใดอย่างหนึ่ง</span>
        <span className="text-lg">หลังการยืนยันตัวตน ท่านจะได้รับ Username & Password ผ่านทางอีเมลล์</span>
      </div>
      <div className="box flex flex-row items-center p-4 md:w-3/4 relative">
        <div className="m-8 w-28 flex-shrink-0 flex">
          <img src={ndid} alt="NDID"/>
        </div>
        <div className="flex flex-col px-4">
          <span className="text-slate-800 font-bold py-4 text-2xl ">1.NDID</span>
          <span>1. ยืนยันตัวตนและสมัคร NDID กับธนาคารที่ท่านใช้บริการเรียบร้อยแล้วเท่านั้น</span>
          <span>2. ทำรายการให้สำเร็จภายใน 1 ชม.</span>
          <span className="p-4 pl-0 md:pl-4"><span className="underline font-bold pr-4">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
          <div className="flex justify-end">
            <button type="button" className="ti-btn ti-btn-primary show-example-btn"
								aria-label="Try me! Example: A custom positioned dialog" id="confirm-btn" onClick={Style2}>
								ตกลง
						</button>
          </div>
        </div>
      </div>
      <div className="box flex flex-row items-center p-4 md:w-3/4 relative">
      <div className="m-8 w-32 h-32 flex-shrink-0 flex">
          <img src={thaiid} alt="THAIID"/>
        </div>
        <div className="flex flex-col px-4">
          <span className="text-slate-800 font-bold py-4 text-2xl ">2.THAIID</span>
          <span>1. ยืนยันตัวตนผ่าน THAIID</span>
          <span>2. ทำรายการให้สำเร็จภายใน 1 วัน</span>
          <span className="p-4 pl-0 md:pl-4"><span className="underline font-bold pr-4">หมายเหตุ</span>ถ้าทำรายการไม่สำเร็จต้องรอ 1 ชม. จึงจะเปลี่ยนวิธียืนยันตัวตนแบบอื่นได้</span>
          <div className="flex justify-end">
            <button type="button" className="ti-btn ti-btn-primary show-example-btn"
								aria-label="Try me! Example: A custom positioned dialog" id="confirm-btn" onClick={Style2}>
								ตกลง
						</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:text-lg font-bold">
        <div className="flex justify-center">
          <span className="font-normal">สอบถามข้อมูลเพิ่มเติม</span>
        </div>
        <div className="flex md:flex-row flex-col md:space-x-4 items-center">
          <span className="flex items-center"><FaPhoneAlt />020884666</span>
          <span className="flex items-center"><MdEmail />callcenter@finansiada.com</span>
        </div>  
      </div>
    </div>
  )
}