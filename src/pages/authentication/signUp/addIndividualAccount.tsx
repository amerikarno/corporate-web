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
import { consolelog, sleep } from "@/lib/utils";
import { toast } from "react-toastify";
import { Loading } from "@/components/loading";
import { pages } from "@/lib/constantVariables";

export default function AddIndividualAccount() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TIndividualAccount>({
    resolver: zodResolver(individualAccountSchema),
  });

  const dispatch = useDispatch();
  const token = getCookies();
  const navigate = useNavigate();

  const fetchIndividualData = async (registerId: string) => {
    const lodingToast = toast(<Loading />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      consolelog({ accountId: registerId });
      const res = await axios.post("/api/v1/individual/list", {
        registerId: registerId,
      });
      dispatch(initIndividualData(res.data[0]));
      consolelog(res);
    } catch (error) {
      console.log(error);
      toast.error("Network Error while fetching Individual data");
    }
    toast.dismiss(lodingToast);
  };

  const individualData = useSelector((state: any) => state.individualData);

  useEffect(() => {
    toast.dismiss();
    const cidValue = localStorage.getItem("registerId");
    if (cidValue) {
      fetchIndividualData(cidValue || "");
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (individualData) {
      consolelog(individualData);
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
      consolelog(fillData);
      reset(fillData);
    }
  }, [individualData, reset]);

  const [thTitle, setThTitle] = useState("");
  const [engTitle, setEngTitle] = useState("");

  const handleTitleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choosedTitle = e.target.value;
    consolelog(choosedTitle);
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
      consolelog("go to this");
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
    await trigger("thTitle");
    await trigger("engTitle");
  };

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
    consolelog(data);
    let body = {
      ...data,
      birthDate: new Date(data.birthDate || 0),
      registerId: localStorage.getItem("registerId")?.toString(),
      pageId: pages[1].id,
    };
    dispatch(
      setTestCorporateData({
        ...body,
        birthDate: new Date(data.birthDate || 0).toISOString(),
      })
    );
    const lodingToast = toast(<Loading />, {
      autoClose: false,
      closeOnClick: false,
    });
    try {
      console.log("body to send ", body);
      if (localStorage.getItem("registerId")?.toString()) {
        const res = await axios.post("/api/v1/individual/update/pre", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        if (res.status === 200) {
          const age = calculateAge(body.birthDate);
          localStorage.setItem("registerId", res.data.registerId);
          localStorage.setItem("age", age.toString());
          console.log(age);
          console.log("update success", res, data);
          toast.dismiss(lodingToast);
          await sleep();
          navigate("/authentication/signup/basicinfo");
        }
      } else {
        const res = await axios.post("/api/v1/individual/precreate", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        if (res.status === 200) {
          const age = calculateAge(body.birthDate);
          localStorage.setItem("registerId", res.data.registerId);
          localStorage.setItem("age", age.toString());
          console.log("create success", res, data);
          toast.dismiss(lodingToast);
          await sleep();
          navigate("/authentication/signup/basicinfo");
        }
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(lodingToast);
      toast.error("Network Error while creating Individual account");
      //TODO: remove link
      await sleep();
      navigate("/authentication/signup/basicinfo");
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
                <div className="lg:w-1/2">
                  <select
                    {...register("thTitle", {
                      onChange: handleTitleChange,
                    })}
                    value={thTitle}
                    className={`${normalStyleInput}`}
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาไทย)</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                  {errors.thTitle && (
                    <span className="text-red-500 text-sm">
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
                    // className={normalStyleInput}
                  />
                  {errors.thName && (
                    <span className="text-red-500 text-sm">
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
                    // className={normalStyleInput}
                  />
                  {errors.thSurname && (
                    <span className="text-red-500 text-sm">
                      {errors.thSurname.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
                <div className="lg:w-1/2">
                  <select
                    {...register("engTitle", {
                      onChange: handleTitleChange,
                    })}
                    value={engTitle}
                    className={`${normalStyleInput}`}
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาอังกฤษ)</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Mrs.">Miss.</option>
                  </select>
                  {errors.engTitle && (
                    <span className="text-red-500 text-sm">
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
                    // className={normalStyleInput}
                  />
                  {errors.engName && (
                    <span className="text-red-500 text-sm">
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
                    // className={normalStyleInput}
                  />
                  {errors.engSurname && (
                    <span className="text-red-500 text-sm">
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
                  // className={normalStyleInput}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="lg:w-1/2">
                <Input
                  type="text"
                  {...register("mobile")}
                  id="mobile"
                  label="หมายเลขโทรศัพท์มือถือ"
                  // className={normalStyleInput}
                />
                {errors.mobile && (
                  <span className="text-red-500 text-sm">
                    {errors.mobile.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-2 lg:space-y-0 lg:flex-row lg:space-x-4">
              <div className="lg:w-1/2 w-full">
                <Input
                  type="date"
                  {...register("birthDate")}
                  label="วัน/เดือน/ปี เกิด"
                  // className={normalStyleInput}
                />
                {errors.birthDate && (
                  <span className="text-red-500 text-sm">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col lg:w-1/2 w-full">
                <select
                  {...register("marriageStatus")}
                  className={`${normalStyleInput}`}
                >
                  <option value="">สถานะ</option>
                  <option value="โสด">Single</option>
                  <option value="สมรส">Married</option>
                  <option value="อย่า">Divorce</option>
                </select>
                {errors.marriageStatus && (
                  <span className="text-red-500 text-sm">
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
                  // className={normalStyleInput}
                />
                {errors.citizenId && (
                  <span className="text-red-500 text-sm">
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
                  // className={normalStyleInput}
                />
                {errors.laserCode && (
                  <span className="text-red-500 text-sm">
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
              {errors.agreement && (
                <span className="text-red-500 text-sm">
                  {errors.agreement.message}
                </span>
              )}
              <div>
                <span className="text-blue-500 text-sm cursor-pointer">
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
