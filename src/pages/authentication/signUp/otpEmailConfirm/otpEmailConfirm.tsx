import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { sleep } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import getImages from "@/common/imagesData";
import { normalStyleInput } from "@/assets/css/normalStyleInput";

import { toast } from "react-toastify";
import { Loading } from "@/components/loading";
import axios from "@/api/axios";
import { pages } from "@/lib/constantVariables";
import { mockFetchData } from "../__mock__/mockFetchData";
import { RootState } from "@/redux/store";
import {
  setEmailIndividualData,
  setIndividualData,
  setMobileIndividualData,
} from "@/redux/slice/fetchIndividualDataSlice";

export function OtpEmailConfirm() {
  const initialTime = 300;
  const individualData = useSelector(
    (state: RootState) => state.individualData.individualDatas
  );
  const dispatch = useDispatch();
  const [disableMobile, setDisableMobile] = useState(true);
  const [disableEmail, setDisableEmail] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const refCode = useRef<string>("");
  const otpRef = useRef<string>("");
  const [count, setCount] = useState<number>(initialTime);
  const [isCountDone, setIsCountDone] = useState<boolean>(false);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "mobile":
        dispatch(setMobileIndividualData(value));
        break;

      case "email":
        dispatch(setEmailIndividualData(value));
        break;

      case "otp":
        otpRef.current = value;
        break;

      default:
        break;
    }
  };

  const startTimmer = () => {
    setIsCountDone(false);
    setCount(initialTime);
    setIsDialogOpen(true);

    intervalId.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
  };

  const confirmEmail = async () => {
    const lodingToast = toast(<Loading />, {
      autoClose: false,
      closeOnClick: false,
    });
    await axios
      .post(
        "/api/v1/verify/email",
        {
          registerId: localStorage.getItem("registerId"),
          email: individualData?.email,
          pageId: pages[6].id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (res) => {
        if (res.status === 200) {
          toast.dismiss();
          await sleep();
          localStorage.clear();
          navigate("/authentication/signup/emailconfirmsucess");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.dismiss(lodingToast);
        toast.error("Network Error while confirming email");
      });
  };
  const handleConfirm = async (type: string) => {
    switch (type) {
      case "mobile":
        setDisableMobile(true);
        await sleep();
        refCode.current = "123456";
        startTimmer();
        break;

      case "email":
        setDisableEmail(true);
        await confirmEmail();
        break;

      default:
        break;
    }
    console.log("click", type);
  };

  const hideOtpNumber = (number?: string) => {
    if (!number) {
      return "xxx-xxx-xxxx";
    }

    let result = "";
    for (let i = 0; i < number.length; i++) {
      if (i < 3 || i > 7) {
        result += number[i];
      } else {
        result += "x";
      }
    }
    return `${result.slice(0, 3)}-${result.slice(3, 6)}-${result.slice(6, 10)}`;
  };

  const convertTimeToString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const resentOtp = async () => {
    startTimmer();
  };

  const fetchIndividualData = async (registerId: string) => {
    const lodingToast = toast(<Loading />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      console.log(registerId);
      const res = await axios.post("/api/v1/individual/list", {
        registerId: registerId,
      });
      dispatch(setIndividualData(res.data[0]));
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Network Error while fetching Individual data");
      //TODO: remove mock data
      dispatch(setIndividualData(mockFetchData[0]));
    }
    toast.dismiss(lodingToast);
  };

  useEffect(() => {
    const registerId = localStorage.getItem("registerId");
    if (registerId) {
      fetchIndividualData(registerId);
    }
  }, [dispatch, individualData]);

  useEffect(() => {
    if (count <= 0) {
      clearInterval(intervalId.current!);
      setIsCountDone(true);
    }
  }, [count]);

  return (
    <div className="flex md:p-4 xl:p-10 h-screen">
      <div className="w-full flex flex-col space-y-10">
        <Card className="w-full lg:w-4/5 xl:w-1/2 bg-white mx-auto border-none shadow-none md:border-gray-300 md:shadow-md">
          <CardHeader className="font-bold text-xl lg:text-2xl">
            กรุณายืนยัน "หมายเลขโทรศัพท์" และ "อีเมล" ของท่าน
          </CardHeader>
          <CardContent className="py-6">
            <div className="">
              <div className="flex flex-row items-center space-x-2">
                <img src={getImages("phoneIcon")} className="w-10 h-10" />
                <h1 className="py-4">
                  1. ยืนยันหมายเลขโทรศัพท์ของท่านผ่าน OTP
                  <span className="text-red-500"> * </span>
                </h1>
              </div>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row pl-12">
                <div className="md:w-2/3">
                  <Input
                    name="mobile"
                    value={individualData?.mobile}
                    onChange={handleInput}
                    label="หมายเลขโทรศัพท์"
                    className={normalStyleInput}
                    // disabled={disableMobile}
                  />
                </div>
                <div className="md:px-4 space-x-4 flex flex-row md:w-1/3 md:pr-4">
                  <Button
                    onClick={() => setDisableMobile(false)}
                    disabled={!disableMobile}
                  >
                    แก้ไข
                  </Button>
                  <Button onClick={() => handleConfirm("mobile")}>
                    ยืนยัน
                  </Button>
                </div>
              </div>
            </div>

            <div className="">
              <div className="flex flex-row items-center space-x-2">
                <img src={getImages("mailIcon")} className="w-10 h-10" />
                <h1 className="py-4">
                  2. ยืนยันอีเมลของท่าน
                  <span className="text-red-500"> * </span>
                </h1>
              </div>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row pl-12">
                <div className="md:w-2/3">
                  <Input
                    name="email"
                    value={individualData?.email}
                    onChange={handleInput}
                    label="อีเมล"
                    className={normalStyleInput}
                    // disabled={disableEmail}
                  />
                </div>
                <div className="md:px-4 md:pr-4 space-x-4 flex flex-row md:w-1/3">
                  <Button
                    onClick={() => setDisableEmail(false)}
                    disabled={!disableEmail}
                  >
                    แก้ไข
                  </Button>
                  <Button onClick={() => handleConfirm("email")}>ยืนยัน</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="w-full lg:w-4/5 xl:w-1/2 flex justify-end mx-auto px-2 md:px-0">
          <Button
            onClick={() => {
              localStorage.clear();
              navigate("/authentication/signup/emailconfirmsucess");
            }}
          >
            Next
          </Button>
        </div>

        <AlertDialog open={isDialogOpen}>
          <AlertDialogContent className="bg-white">
            <AlertDialogTitle>
              กรุณายืนยันรหัส OTP 6 หลัก ระบบได้ทำการส่งรหัส OTP ไปยังหมายเลข{" "}
              {hideOtpNumber(individualData?.mobile)} แล้ว
            </AlertDialogTitle>{" "}
            <AlertDialogTitle className="bg-white">
              ref code : {refCode.current}
            </AlertDialogTitle>
            <div>
              <div className="pb-10 space-y-4">
                <p>
                  รหัส OTP 6 หลัก<span className="text-red-500"> * </span>
                </p>
                <Input name="otp" onChange={handleInput} />
              </div>
              <div>
                กรุณาตรวจสอบรหัส OTP บนโทรศัพย์มือถือของท่านภายใน 5 นาที
              </div>
              <div>
                หากท่านไม่ได้รับรหัส OTP{" "}
                {isCountDone ? (
                  <u className="hover:cursor-pointer" onClick={resentOtp}>
                    คลิก
                  </u>
                ) : (
                  <u>กรุณารอ {convertTimeToString(count)} นาที</u>
                )}
              </div>
            </div>
            <AlertDialogAction
              className="w-full"
              onClick={() => {
                clearInterval(intervalId.current!);
                setIsDialogOpen(false);
              }}
            >
              Confirm
            </AlertDialogAction>
            <AlertDialogCancel
              className="w-full"
              onClick={() => {
                clearInterval(intervalId.current!);
                setIsDialogOpen(false);
              }}
            >
              Cancle
            </AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
