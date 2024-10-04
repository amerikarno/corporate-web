import { Card, CardContent } from "@/components/ui/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TIndividualAccount,
  individualAccountSchema,
} from "./constant/schemas";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { normalStyleInput } from "@assets/css/normalStyleInput";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "@/lib/cookies";
import axios from "@/api/axios";
import { initIndividualData, setTestCorporateData } from "@/redux/Action";
import { consoleLog } from "@/lib/utils";

export default function AddIndividualAccount() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TIndividualAccount>({
    resolver: zodResolver(individualAccountSchema),
  });

  const dispatch = useDispatch();
  const token = getCookies();

  const fetchIndividualData = async (AccountID: string) => {
    try {
      consoleLog(AccountID);
      const res = await axios.post(
        "authentication/signup/basicinfo",
        { AccountID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(initIndividualData(res.data[0]));
      consoleLog(res);
    } catch (error) {
      consoleLog(error);
    }
  };

  const individualData = useSelector((state: any) => state.individualDatas);

  useEffect(() => {
    const cidValue = localStorage.getItem("cid");
    if (cidValue) {
      fetchIndividualData(cidValue || "");
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (individualData) {
      consoleLog(individualData);
      const dateFormatted = individualData?.birthDate?.split("T")[0];
      const fillData: TIndividualAccount = {
        email: individualData.email || "",
        citizenId: individualData.citizenId || "",
        thTitle: individualData.thTitle || "",
        thName: individualData.thName || "",
        thSurname: individualData.thSurname || "",
        engTitle: individualData.engTitle || "",
        engName: individualData.engName || "",
        engSurname: individualData.engSurname || "",
        mobile: individualData.mobile || "",
        birthDate: dateFormatted || "",
        marriageStatus: individualData.marriageStatus || "",
        laserCode: individualData.laserCode || "",
        agreement: true,
      };
      consoleLog(fillData);
      reset(fillData);
    }
  }, [individualData, reset]);

  const [thTitle, setThTitle] = useState("");
  const [engTitle, setEngTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choosedTitle = e.target.value;
    consoleLog(choosedTitle);
    if (choosedTitle === "นาย") {
      setThTitle("นาย");
      setEngTitle("Mr.");
      setValue("thTitle", "นาย");
      setValue("engTitle", "Mr.");
    } else if (choosedTitle === "นาง") {
      setThTitle("นาง");
      setEngTitle("Mrs.");
      setValue("thTitle", "นาง");
      setValue("engTitle", "Mrs.");
    } else if (choosedTitle === "นางสาว") {
      consoleLog("go to this");
      setThTitle("นางสาว");
      setEngTitle("Miss.");
      setValue("thTitle", "นางสาว");
      setValue("engTitle", "Miss.");
    } else if (choosedTitle === "Mr.") {
      setThTitle("นาย");
      setEngTitle("Mr.");
      setValue("thTitle", "นาย");
      setValue("engTitle", "Mr.");
    } else if (choosedTitle === "Mrs.") {
      setThTitle("นาง");
      setEngTitle("Mrs.");
      setValue("thTitle", "นาง");
      setValue("engTitle", "Mrs.");
    } else if (choosedTitle === "Miss.") {
      setThTitle("นางสาว");
      setEngTitle("Miss.");
      setValue("thTitle", "นางสาว");
      setValue("engTitle", "Miss.");
    }
  };

  const navigate = useNavigate();

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  const onSubmit = async (data: TIndividualAccount) => {
    consoleLog(data);
    let body = {
      ...data,
      birthDate: new Date(data.birthDate),
      pageId: 100,
      cid: localStorage.getItem("cid")?.toString(),
    };
    dispatch(
      setTestCorporateData({
        ...body,
        birthDate: new Date(data.birthDate).toISOString(),
      })
    );
    try {
      const token = getCookies();
      consoleLog("body to send ", body);
      if (individualData?.id) {
        consoleLog("api : /api/v1/individual/update/pre");
        const res = await axios.post("/api/v1/individual/update/pre", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        consoleLog(res);
        if (res.status === 200) {
          const age = calculateAge(body.birthDate);
          localStorage.setItem("cid", res.data.id);
          localStorage.setItem("age", age.toString());
          consoleLog(age);
          consoleLog("update success", res, data);

          navigate("/authentication/signup/basicinfo");
          window.scrollTo(0, 0);
        }
      } else {
        consoleLog("api : /api/v1/individual/precreate ", body);
        const res = await axios.post("/api/v1/individual/precreate", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        consoleLog(res);
        if (res.status === 200) {
          const age = calculateAge(body.birthDate);
          localStorage.setItem("cid", res.data.id);
          localStorage.setItem("age", age.toString());
          consoleLog("create success", res, data);

          navigate("/authentication/signup/basicinfo");
          window.scrollTo(0, 0);
        }
      }
    } catch (error) {
      consoleLog(error);
    }
  };

  return (
    <div className="md:p-4 flex justify-center">
      <Card className="border-none shadow-none md:shadow-md md:border-gray-300 lg:w-2/3 bg-white">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
            <div className="space-y-4 pt-8">
              <h1 className="text-lg font-bold underline-offset-1 underline pb-4">
                กรอกข้อมูลส่วนตัว
              </h1>
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
                <div className="lg:w-1/2 h-[48px]">
                  <select
                    {...register("thTitle")}
                    onChange={handleTitleChange}
                    value={thTitle}
                    className={normalStyleInput}
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาไทย)</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                  {errors.thTitle && (
                    <span className="text-red-500">
                      {errors.thTitle.message}
                    </span>
                  )}
                </div>
                <div className="hidden lg:block lg:w-1/2"></div>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
                <div className="lg:w-1/2">
                  <Input
                    type="text"
                    {...register("thName")}
                    id="thName"
                    label="ชื่อ (ภาษาไทย)"
                    className={normalStyleInput}
                  />
                  {errors.thName && (
                    <span className="text-red-500">
                      {errors.thName.message}
                    </span>
                  )}
                </div>
                <div className="lg:w-1/2">
                  <Input
                    type="text"
                    {...register("thSurname")}
                    id="thSurname"
                    label="ชื่อสกุล (ภาษาไทย)"
                    className={normalStyleInput}
                  />
                  {errors.thSurname && (
                    <span className="text-red-500">
                      {errors.thSurname.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
                <div className="lg:w-1/2 h-[48px]">
                  <select
                    {...register("engTitle")}
                    onChange={handleTitleChange}
                    value={engTitle}
                    // className="border border-gray-700 cursor-pointer hover:bg-slate-100 block px-2.5 py-3 rounded-md w-full h-full text-sm text-gray-600 bg-white"
                    className={normalStyleInput}
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาอังกฤษ)</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Mrs.">Miss.</option>
                  </select>
                  {errors.engTitle && (
                    <span className="text-red-500">
                      {errors.engTitle.message}
                    </span>
                  )}
                </div>
                <div className="hidden lg:block lg:w-1/2"></div>
              </div>
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
                <div className="lg:w-1/2">
                  <Input
                    type="text"
                    {...register("engName")}
                    id="engName"
                    label="ชื่อ (ภาษาอังกฤษ)"
                    className={normalStyleInput}
                  />
                  {errors.engName && (
                    <span className="text-red-500">
                      {errors.engName.message}
                    </span>
                  )}
                </div>

                <div className="lg:w-1/2">
                  <Input
                    type="text"
                    {...register("engSurname")}
                    id="engSurname"
                    label="ชื่อสกุล (ภาษาอังกฤษ)"
                    className={normalStyleInput}
                  />
                  {errors.engSurname && (
                    <span className="text-red-500">
                      {errors.engSurname.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
              <div className="lg:w-1/2">
                <Input
                  type="text"
                  {...register("email")}
                  id="email"
                  label="อีเมล"
                  className={normalStyleInput}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="lg:w-1/2">
                <Input
                  type="text"
                  {...register("mobile")}
                  id="mobile"
                  label="หมายเลขโทรศัพท์มือถือ"
                  className={normalStyleInput}
                />
                {errors.mobile && (
                  <span className="text-red-500">{errors.mobile.message}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
              <div className="lg:w-1/2 h-[48px] w-full">
                <Input
                  type="date"
                  {...register("birthDate")}
                  label="วัน/เดือน/ปี เกิด"
                  // className="w-full h-full border border-gray-700 cursor-pointer px-2.5 py-3 rounded-md text-gray-600 pl-2 bg-transparent hover:bg-slate-100 focus:border-blue-700"
                  className={normalStyleInput}
                />
                {errors.birthDate && (
                  <span className="text-red-500">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col lg:w-1/2 w-full h-[48px]">
                <select
                  {...register("marriageStatus")}
                  // className="border h-full border-gray-700 cursor-pointer px-2.5 py-3 rounded-md text-gray-600 pl-2 bg-transparent hover:bg-slate-100 focus:border-blue-700"
                  className={normalStyleInput}
                >
                  <option value="">สถานะ</option>
                  <option value="โสด">Single</option>
                  <option value="สมรส">Married</option>
                  <option value="อย่า">Divorce</option>
                </select>
                {errors.marriageStatus && (
                  <span className="text-red-500">
                    {errors.marriageStatus.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
              <div className="lg:w-1/2">
                <Input
                  type="text"
                  {...register("citizenId")}
                  id="citizenId"
                  label="หมายเลขบัตรประชาชน"
                  className={normalStyleInput}
                />
                {errors.citizenId && (
                  <span className="text-red-500">
                    {errors.citizenId.message}
                  </span>
                )}
              </div>

              <div className="lg:w-1/2">
                <Input
                  type="text"
                  {...register("laserCode")}
                  id="lasorCode"
                  label="เลขหลังบัตรประชาชน (Laser Code)"
                  className={normalStyleInput}
                />
                {errors.laserCode && (
                  <span className="text-red-500">
                    {errors.laserCode.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="space-x-4">
                <input
                  type="checkbox"
                  id="agreement"
                  {...register("agreement")}
                />
                <label htmlFor="agreement" className="text-gray-500">
                  ข้อพเจ้าได้อ่านและตกลงตามข้อกำหนดและเงื่อนไขและรับทราบนโยบายความเป็นส่วนตัว
                </label>
              </div>
              <div>
                <span className="text-red-500 cursor-pointer">
                  อ่านรายละเอียดเพิ่มเติม
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
