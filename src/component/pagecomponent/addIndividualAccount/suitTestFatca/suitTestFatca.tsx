import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { useState } from "react";
import SubSuitTest from "./subSuitTest";
import KnowLedgeTest from "./knowLedgeTest";
import { TiTick } from "react-icons/ti";
import "./suitTestFatca.css";
// import { isAllowedPage } from "@/lib/utils";
// import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/layout/layoutsection/pageHeader/pageHeader";
import toast,{ Toaster ,ToasterProps } from 'react-hot-toast';

const ErrorNotify = (text:string): void => {
  const options: ToasterProps = {
    reverseOrder: false,
  };
  
  toast.error(text, options);
};

export default function SuitTestFatca() {
  // if (!isAllowedPage(2002)) {
  //   return <UnAuthorize />;
  // }

  const [fatcaradio, setFatcaRadio] = useState("fatcaradio-2");
  const [knowLedgeTest, setKnowLedgeTest] = useState("knowLedgeTest-2");
  const [fatcaInfo, setFatcaInfo] = useState<string | boolean[]>("");
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(
    new Array(8).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[index] = !updatedCheckboxStates[index];
    setCheckboxStates(updatedCheckboxStates);
    setFatcaInfo(updatedCheckboxStates);
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [knowLedgeTestSuccess, setKnowLedgeTestSuccess] = useState(false);
  const [suitTestSuccess, setSuitTestSuccess] = useState(false);
  const navigate = useNavigate();

  const handleKnowLedgeTestSuccess = (success: boolean) => {
        setKnowLedgeTestSuccess(success);
        console.log('Test Success:', success);
    };
  const handleSuitTestSuccess = (success:boolean) =>{
      setSuitTestSuccess(success)
      console.log("Suit Test submit button pressed!")
  }
  //fatcaradio === "fatcaradio-2" แปลว่าไม่ใช่อเมริกา

  const handleSubmitSuitTestFatca = () => {
    console.log(isButtonDisabled);
    console.log(suitTestSuccess);
    console.log(fatcaradio === "fatcaradio-2");
    console.log(fatcaInfo !== "");
    if (
      suitTestSuccess &&
      (fatcaradio === "fatcaradio-2" || fatcaInfo !== "")
    ) {
      let body = {
        id: localStorage.getItem("cid"),
        suiteTestResult: [1, 1, 1, 1, 1, 1, 1, 1, 1].join("|"),
        isFatca: fatcaradio === "fatcaradio-1",
        fatcaInfo: fatcaInfo,
        isKnowLedgeDone: knowLedgeTestSuccess,
        knowLedgeTestResult: knowLedgeTestSuccess ? 15 : 0,
        pageID: 400,
      };
      console.log(body);
      navigate("/create-job/added-individual-account/identityVerification");
    } else {
      if(suitTestSuccess){
        ErrorNotify("If you were American please finish your fatca info.");
      }else{
        ErrorNotify("Please do suit test first.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="p-8">
      <PageHeader currentpage="แบบประเมินความเหมาะสมในการลงทุน" activepage="Suite Test" mainpage="Identity Verification" />
      <Toaster />
      <SubSuitTest onSuitTestDone={handleSuitTestSuccess} />
      <div className="box mt-8">
        <CardContent>
          <div className="p-4 space-y-4 pr-8 pl-8 flex flex-col">
            <span className="text-xl font-bold mb-4">กรอกข้อมูล FATCA</span>
            <div className="space-y-4">
              <span>ข้าพเจ้ามีข้อใดข้อหนึ่งดังนี้:</span>
              <div className="flex flex-col pl-4">
                <span>
                  - มีสัญชาติอเมริกัน / เกิดที่อเมริกา /
                  มีที่อยู่ในอเมริกาสำหรับพักอาศัยและติดต่อ
                </span>
                <span>- โอนเงินเป็นประจำไปบัญชีที่อเมริกา</span>
              </div>
              <div className="flex space-x-6 pt-4">
                <div className="space-x-2">
                  <input
                    id="fatcaradio-1"
                    name="radio-for-fatca"
                    type="radio"
                    checked={fatcaradio === "fatcaradio-1"}
                    onChange={() => setFatcaRadio("fatcaradio-1")}
                  />
                  <label htmlFor="fatcaradio-1">ใช่</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="fatcaradio-2"
                    name="radio-for-fatca"
                    type="radio"
                    checked={fatcaradio === "fatcaradio-2"}
                    onChange={() => {
                      setFatcaRadio("fatcaradio-2");
                      setFatcaInfo("");
                      setIsButtonDisabled(false);
                      setCheckboxStates(new Array(8).fill(false));
                    }}
                  />
                  <label htmlFor="fatcaradio-2">ไม่ใช่</label>
                </div>
              </div>
              <div className="pl-4">
                {fatcaradio === "fatcaradio-1" && (
                  <div className="space-y-4 flex flex-col">
                    {[
                      "เป็นพลเมืองอเมริกา",
                      "มีกรีนการ์ดหรือบัตรผู้มีที่อยู่ถาวรในอเมริกา",
                      "มีที่อยู่ในอเมริกาเพื่อวัตถุประสงค์ทางภาษี",
                      "เกิดในอเมริกาแต่สละสถานะพลเมืองแล้ว",
                      "มีที่อยู่ในอเมริกาสำหรับบัญชีที่เปิดกับบริษัท ฟินันเซีย ดิจิทัล แอสเซท จำกัด",
                      "มีเบอร์โทรอเมริกา (ตนเองหรือผู้เกี่ยวข้อง) เกี่ยวข้องกับบัญชีที่เปิดกับบริษัท ฟินันเซีย ดิจิทัล แอสเซท จำกัด",
                      "มีการโอนเงินอัตโนมัติจากบัญชีที่เปิดกับบริษัท ฟินันเซีย ดิจิทัล แอสเซท จำกัด ไปบัญชีอเมริกา",
                      "ได้มอบอำนาจให้บุคคลที่อยู่ในอเมริกาทำธุรกรรมใดๆที่เกี่ยวข้องกับบัญชี บริษัท ฟินันเซีย ดิจิทัล เเอสเซท จำกัด",
                    ].map((label, index) => (
                      <div key={index} className="space-x-4">
                        <input
                          type="checkbox"
                          id={`fatcaCheckbox-${index + 1}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={checkboxStates[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={`fatcaCheckbox-${index + 1}`}>
                          {label}
                        </label>
                      </div>
                    ))}
                    <div className="">
                      <Button
                        className={
                          isButtonDisabled
                            ? "bg-green-500 text-white border-4 rounded-full transition-all duration-500 cursor-pointer"
                            : "ti-btn ti-btn-primary"
                        }
                        // disabled={isButtonDisabled}
                        onClick={() => {
                          setIsButtonDisabled(true);
                          console.log("fatcaInfo : ", fatcaInfo);
                        }}
                      >
                        {isButtonDisabled ? (
                          <TiTick className="text-xl" />
                        ) : (
                          "ถัดไป"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-8">
                ข้าพเจ้าเข้าใจว่าเมื่อข้อมูลข้างต้นเปลี่ยนแปลง
                ข้าพเจ้าจะแจ้งบริษัทฯในทันที
              </div>
            </div>
          </div>
        </CardContent>
      </div>
      <div className="box">
        <CardContent>
          <div className="p-4 pl-8">
            <div>
              <span className="text-xl">
                ท่านต้องการทำแบบทดสอบความรู้ Knowledge Test
              </span>
              <div className="flex space-x-6 pt-4">
                <div className="space-x-2">
                  <input
                    id="knowLedgeTest-1"
                    name="radio-for-knowLedgeTest"
                    type="radio"
                    checked={knowLedgeTest === "knowLedgeTest-1"}
                    onChange={() => setKnowLedgeTest("knowLedgeTest-1")}
                  />
                  <label htmlFor="knowLedgeTest-1">ทำตอนนี้</label>
                </div>
                <div className="space-x-2">
                  <input
                    id="knowLedgeTest-2"
                    name="radio-for-knowLedgeTest"
                    type="radio"
                    checked={knowLedgeTest === "knowLedgeTest-2"}
                    onChange={() => setKnowLedgeTest("knowLedgeTest-2")}
                  />
                  <label htmlFor="knowLedgeTest-2">ทำภายหลัง</label>
                </div>
              </div>
            </div>
            {knowLedgeTest === "knowLedgeTest-1" && (
              <div>
                <KnowLedgeTest onTestSuccess={handleKnowLedgeTestSuccess} />
              </div>
            )}
          </div>
        </CardContent>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmitSuitTestFatca} className = "ti-btn ti-btn-primary">Next Form</Button>
      </div>
      <div>
        {/* {suitTestSuccess ? <div>Suit Test Completed Successfully!</div> : <div>Suit Test Not Completed</div>}
          {<div className="">isAmerican ? : {fatcaradio === "fatcaradio-1" ? "true" : "false"}</div>}
          {knowLedgeTestSuccess ? <div>KnowLedge Test Completed Successfully!</div> : <div>KnowLedge Test Not Completed</div>} */}
      </div>
    </div>
  );
}
