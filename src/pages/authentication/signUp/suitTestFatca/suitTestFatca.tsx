import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useEffect, useState } from "react";
import SubSuitTest from "./subSuitTest";
import KnowLedgeTest from "./knowLedgeTest";
import { TiTick } from "react-icons/ti";
import "./suitTestFatca.css";
import { sleep } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { setSuitFatca, setTestCorporateData } from "@/redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "@/lib/cookies";
import { toast } from "react-toastify";
import { Loading } from "@/components/loading";
import { pages } from "@/lib/constantVariables";
import { mockFetchData } from "../__mock__/mockFetchData";
import { RootState } from "@/redux/store";
import { setIndividualData } from "@/redux/slice/fetchIndividualDataSlice";

export default function SuitTestFatca() {
  const token = getCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const individualData = useSelector(
    (state: RootState) => state.individualData.individualDatas
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [knowLedgeTestSuccess, setKnowLedgeTestSuccess] = useState(false);
  const [suitTestSuccess, setSuitTestSuccess] = useState(false);
  const [suitTestResult, setSuitTestResult] = useState();
  const [fatcaradio, setFatcaRadio] = useState("fatcaradio-2");
  const [knowLedgeTest, setKnowLedgeTest] = useState("knowLedgeTest-2");
  const [fatcaInfo, setFatcaInfo] = useState<string | number[]>(``);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>(
    new Array(8).fill(false)
  );

  const fetchIndividualData = async (registerId: string) => {
    const loadingToast = toast(<Loading />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      console.log(registerId);
      const res = await axios.post(
        "/api/v1/individual/list",
        {
          registerId: registerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setIndividualData(res.data[0]));
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Network Error while fetching Individual data");
      //TODO: remove mock data
      dispatch(setIndividualData(mockFetchData[0]));
    }
    toast.dismiss(loadingToast);
  };

  useEffect(() => {
    toast.dismiss();
    const registerId = localStorage.getItem("registerId");
    if (registerId) {
      fetchIndividualData(registerId || "");
    } else {
      console.log("registerId not found");
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (individualData?.SuiteTestResult.isFatca) {
      setFatcaInfo(individualData.SuiteTestResult.fatcaInfo);
      if (Array.isArray(fatcaInfo)) {
        const initialCheckboxStates = fatcaInfo.map((state) => state === 1);
        setCheckboxStates(initialCheckboxStates);
      }
      setFatcaRadio("fatcaradio-1");
    }

    if (individualData?.SuiteTestResult.isKnowLedgeDone) {
      setKnowLedgeTest("knowLedgeTest-1");
      setKnowLedgeTestSuccess(true);
    }
  }, [individualData]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[index] = !updatedCheckboxStates[index];

    //change from true to 1 and false to 0
    const numericCheckboxStates = updatedCheckboxStates.map((state) =>
      state ? 1 : 0
    );
    console.log(numericCheckboxStates);
    setCheckboxStates(updatedCheckboxStates);
    setFatcaInfo(numericCheckboxStates);
  };

  const handleKnowLedgeTestSuccess = (success: boolean) => {
    setKnowLedgeTestSuccess(success);
    console.log("Test Success:", success);
  };
  const handleSuitTestSuccess = (success: boolean) => {
    setSuitTestSuccess(success);
    console.log("Suit Test submit button pressed!");
  };

  const handleSuitTestResult = (exam_result: any) => {
    console.log(exam_result);
    setSuitTestResult(exam_result);
  };
  //fatcaradio === "fatcaradio-2" แปลว่าไม่ใช่อเมริกา
  const handleSubmitSuitTestFatca = async () => {
    console.log(isButtonDisabled);
    console.log(suitTestSuccess);
    console.log(fatcaradio === "fatcaradio-2");
    console.log(fatcaInfo !== "");
    if (
      suitTestSuccess &&
      (fatcaradio === "fatcaradio-2" ||
        JSON.stringify(fatcaInfo) !== JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0]))
    ) {
      let body = {
        registerId: localStorage.getItem("registerId"),
        suiteTestResult: suitTestResult,
        isFatca: fatcaradio === "fatcaradio-1",
        fatcaInfo: fatcaInfo === "" ? [] : fatcaInfo,
        isKnowLedgeDone: knowLedgeTestSuccess,
        knowLedgeTestResult: knowLedgeTestSuccess ? 15 : 0,
        pageId: pages[3].id,
      };
      console.log(body);
      dispatch(setTestCorporateData(body));
      dispatch(setSuitFatca(body));
      const loadingToast = toast(<Loading />, {
        autoClose: false,
        closeOnClick: false,
      });
      if (individualData?.SuiteTestResult?.suiteTestResult?.totalScore) {
        console.log("suite test updating...");
        try {
          const res = await axios.post(
            "/api/v1/suitetest/result/individual/edit",
            body,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(res);
          if (res.status === 200) {
            console.log("suit test edit success", res.data);
            toast.dismiss();
            await sleep();
            navigate("/authentication/signup/livenessinstruction");
            // navigate("/authentication/signup/otpemailconfirm");
          } else {
            console.log("suit test edit not success");
            toast.dismiss(loadingToast);
            toast.error("Network Error while updating Individual data");
          }
        } catch (error) {
          toast.dismiss();
          console.log(error);
        }
      } else {
        console.log("suite test saving...");
        try {
          const res = await axios.post(
            "/api/v1/suitetest/result/individual/save",
            body,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(res);
          if (res.status === 200) {
            console.log("suit test save success", res.data);
            toast.dismiss();
            await sleep();
            navigate("/authentication/signup/livenessinstruction");
            // navigate("/authentication/signup/otpemailconfirm");
          } else {
            toast.dismiss(loadingToast);
            toast.error("Network Error while saving Individual data");
            console.log("suit test save not success");
          }
        } catch (error) {
          toast.dismiss(loadingToast);
          toast.error("Network Error while saving Individual data");
          console.log(error);
        }
      }
    } else {
      //       alert(`Please complete the suite test,
      // if you are an American citizen, please complete the FATCA form first.`);
      toast.info("Please complete the suite test first");
      await sleep();
      navigate("/authentication/signup/livenessinstruction");
    }
  };

  return (
    <div className="flex justify-center py-4 lg:py-10">
      <div className="space-y-8 p-4 w-full xl:w-4/5">
        <div className="px-2 text-xl xl:text-2xl font-bold text-slate-800 ">
          แบบประเมินความเหมาะสมในการลงทุน
        </div>
        <SubSuitTest
          onSuitTestDone={handleSuitTestSuccess}
          suitTestResult={handleSuitTestResult}
        />
        <Card className="bg-white">
          <CardContent>
            <div className="space-y-4 xl:px-4 flex flex-col">
              <span className="text-xl font-bold py-4">กรอกข้อมูล FATCA</span>
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
                        "มีที่อยู่ในอเมริกาสำหรับบัญชีที่เปิดกับบริษัท ",
                        "มีเบอร์โทรอเมริกา (ตนเองหรือผู้เกี่ยวข้อง) เกี่ยวข้องกับบัญชีที่เปิดกับบริษัท ",
                        "มีการโอนเงินอัตโนมัติจากบัญชีที่เปิดกับบริษัท ไปบัญชีอเมริกา",
                        "ได้มอบอำนาจให้บุคคลที่อยู่ในอเมริกาทำธุรกรรมใดๆที่เกี่ยวข้องกับบัญชีบริษัท",
                      ].map((label, index) => (
                        <div key={index} className="space-x-4">
                          <input
                            type="checkbox"
                            id={`fatcaCheckbox-${index + 1}`}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
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
                              : ""
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
        </Card>

        <Card className="bg-white">
          <CardContent>
            <div className="p-4 xl:pl-8">
              <span className="text-xl">
                ท่านต้องการทำแบบทดสอบความรู้ Knowledge Test
              </span>
              <div className="flex flex-col lg:flex-row lg:space-x-6 pt-4 space-y-4 lg:space-y-0">
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
              {knowLedgeTest === "knowLedgeTest-1" && (
                <KnowLedgeTest onTestSuccess={handleKnowLedgeTestSuccess} />
              )}
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end px-2">
          <Button onClick={handleSubmitSuitTestFatca}>Next Form</Button>
        </div>
        <div>
          {/* {suitTestSuccess ? <div>Suit Test Completed Successfully!</div> : <div>Suit Test Not Completed</div>}
          {<div className="">isAmerican ? : {fatcaradio === "fatcaradio-1" ? "true" : "false"}</div>}
          {knowLedgeTestSuccess ? <div>KnowLedge Test Completed Successfully!</div> : <div>KnowLedge Test Not Completed</div>} */}
        </div>
      </div>
    </div>
  );
}
