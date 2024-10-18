import { Button } from "@/components/ui/Button";
import { Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ConfirmSuccess() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full p-4">
      <div className="p-4 max-w-[768px] mx-auto h-full space-y-10">
        <h1>ทางบริษัทฯได้รับคำขอเปิดบัญชีของท่านเรียบร้อยแล้ว</h1>

        <div className="">
          <h2>
            กรุณา <span>ตรวจสอบอีเมล</span> ของท่านและ
            <br />
            <span>"กดยืนยัน"</span>
            เพื่อทำรายการต่อ!
          </h2>
          <div className="detail-mail">
            (ตรวจสอบใน Spam หากท่านไม่ได้รับอีเมล)
          </div>
          <div className="detail-phone">
            *หากท่านไม่ได้รับอีเมล กรุณาติดต่อ โทร. 02-xxx-xxxx กด 0
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-10">
          <div className="">
            สอบถามข้อมูลเพิ่มเติม <br />
            ทุกวันทำการ 8:30 - 18:00 น.
          </div>
          <div className="flex flex-row space-x-4">
            <Phone />
            <p>02 xxx xxxx</p>
          </div>
          <div className="flex flex-row space-x-4">
            <Mail />
            <p>csinfo@ICOPortal.com</p>
          </div>
        </div>

        <Button onClick={() => navigate("/")}>กลับหน้าหลัก</Button>
      </div>
    </div>
  );
}
