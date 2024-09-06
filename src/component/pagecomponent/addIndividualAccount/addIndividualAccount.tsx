// import { isAllowedPage } from "@/lib/utils";
// import UnAuthorize from "@/pages/unAuthorizePage/unAuthorize";
// import Liveness from "./livenessOcr/livenessOcr";
import { Card, CardContent } from "./components/ui/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TIndividualAccount,
  individualAccountSchema,
} from "./constant/schemas";
import { Input } from "./components/ui/Input";
import { Button } from "./components/ui/Button";
// import { getCookies } from "@/lib/Cookies";
// import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/layout/layoutsection/pageHeader/pageHeader";
import { useEffect, useState } from "react";
// import { OtpEmailConfirm } from "./otpEmailConfirm/otpEmailConfirm";

export default function AddIndividualAccount() {
  // if (!isAllowedPage(2002)) {
  //   return <UnAuthorize />;
  // }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TIndividualAccount>({
    resolver: zodResolver(individualAccountSchema),
  });

  const [thTitle,setThTitle] = useState("");
  const [engTitle,setEngTitle] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choosedTitle = e.target.value;
    console.log(choosedTitle)
    if(choosedTitle === "นาย"){
      setThTitle("นาย")
      setEngTitle("Mr.")
    }
    else if(choosedTitle === "นาง"){
      setThTitle("นาง")
      setEngTitle("Mrs.")
    }
    else if(choosedTitle === "นางสาว"){
      console.log("go to this")
      setThTitle("นางสาว")
      setEngTitle("Miss.")
    }
    else if(choosedTitle === "Mr."){
      setThTitle("นาย")
      setEngTitle("Mr.")
    }
    else if(choosedTitle === "Mrs."){
      setThTitle("นาง")
      setEngTitle("Mrs.")
    }
    else if(choosedTitle === "Miss."){
      setThTitle("นางสาว")
      setEngTitle("Miss.")
    }
  }

  useEffect(()=>{
    setValue("thTitle",thTitle)
    setValue("engTitle",engTitle)
  },[thTitle,engTitle])

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
    let body = { ...data, birthDate: new Date(data.birthDate), pageId: 100 };
    console.log(body);
    // try {
    //   const token = getCookies();
    //   const res = await axios.post("/api/v1/individual/precreate", body, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   console.log(res);
    //   if (res.status === 200) {
    //     const age = calculateAge(body.birthDate);
    //     localStorage.setItem("cid", res.data.id);
    //     localStorage.setItem("age", age.toString());
    //     console.log(age);
    //     console.log("success", res, data);

    //     navigate("/create-job/added-individual-account/basicinfo");
    //     window.scrollTo(0, 0);
    //   }
    // } catch (error) {
    //   console.log(error);

    //   const todo = "remove all below";
    //   const age = calculateAge(body.birthDate);
    //   localStorage.setItem("cid", "90000001");
    //   localStorage.setItem("age", age.toString());
    //   navigate("/create-job/added-individual-account/basicinfo");
    //   window.scrollTo(0, 0);
    // }
  };

  return (
    <div className="p-8">
      <PageHeader currentpage="กรอกข้อมูลส่วนตัว" activepage="Add Individual Account" mainpage="Basic Info" />
      <div className="box">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
            <div className="space-y-8 pt-8">
              <div className = "box-header">
                  <h5 className = "box-title">กรอกข้อมูลส่วนตัว</h5>
              </div>
              <div className="flex flex-col">
                <div className="w-1/2 pr-2">
                  <select
                    {...register("thTitle")}
                    onChange={handleTitleChange}
                    value={thTitle}
                    className="cursor-pointer hover:bg-slate-100 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 bg-transparent
                    rounded-lg border border-gray-600 dark:text-white dark:border-gray-500
                     dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600"
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาไทย)</option>
                    <option value="นาย">นาย</option>
                    <option value="นาง">นาง</option>
                    <option value="นางสาว">นางสาว</option>
                  </select>
                </div>
                {errors.thTitle && (
                  <span className="text-red-500">{errors.thTitle.message}</span>
                )}
                <div className="w-1/2"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("thName")}
                    placeholder="ชื่อ (ภาษาไทย)"
                    id="thName"
                  />
                  {errors.thName && (
                    <span className="text-red-500">
                      {errors.thName.message}
                    </span>
                  )}
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("thSurname")}
                    placeholder="ชื่อสกุล (ภาษาไทย)"
                    id="thSurname"
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
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <select
                    {...register("engTitle")}
                    onChange={handleTitleChange}
                    value={engTitle}
                    className="cursor-pointer hover:bg-slate-100 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-600 bg-transparent
                    rounded-lg border border-gray-600 dark:text-white dark:border-gray-500
                     dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600"
                  >
                    <option value="">คำนำหน้าชื่อ (ภาษาอังกฤษ)</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss.">Miss.</option>
                  </select>
                  {errors.engTitle && (
                    <span className="text-red-500">
                      {errors.engTitle.message}
                    </span>
                  )}
                </div>
                <div className="w-1/2"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engName")}
                    placeholder="ชื่อ (ภาษาอังกฤษ)"
                    id="engName"
                  />
                  {errors.engName && (
                    <span className="text-red-500">
                      {errors.engName.message}
                    </span>
                  )}
                </div>

                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engSurname")}
                    placeholder="ชื่อสกุล (ภาษาอังกฤษ)"
                    id="engSurname"
                  />
                  {errors.engSurname && (
                    <span className="text-red-500">
                      {errors.engSurname.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 pt-8">
              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("email")}
                  placeholder="อีเมลล์"
                  id="email"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("mobile")}
                  placeholder="หมายเลขโทรศัพท์มือถือ"
                  id="mobile"
                />
                {errors.mobile && (
                  <span className="text-red-500">{errors.mobile.message}</span>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <Input
                  type="date"
                  {...register("birthDate")}
                  placeholder="วัน/เดือน/ปี เกิด"
                />
                {errors.birthDate && (
                  <span className="text-red-500">
                    {errors.birthDate.message}
                  </span>
                )}
              </div>

              <div className="flex  flex-col w-1/2">
                <select
                  {...register("mariageStatus")}
                  className="cursor-pointer border p-3.5 border-gray-700 text-gray-600 pl-2 hover:bg-slate-100
                text-sm rounded-lg focus:ring-gray-700 focus:border-gray-700 block w-full dark:bg-gray-700 dark:border-gray-600
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-700 dark:focus:border-gray-700"
                >
                  <option value="">สถานะ</option>
                  <option value="โสด">Single</option>
                  <option value="สมรส">Married</option>
                  <option value="อย่า">Divorce</option>
                </select>
                {errors.mariageStatus && (
                  <span className="text-red-500">
                    {errors.mariageStatus.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("citizenId")}
                  placeholder="หมายเลขบัตรประชาชน"
                  id="citizenId"
                />
                {errors.citizenId && (
                  <span className="text-red-500">
                    {errors.citizenId.message}
                  </span>
                )}
              </div>

              <div className="w-1/2">
                <Input
                  type="text"
                  {...register("laserCode")}
                  placeholder="เลขหลังบัตรประชาชน (Laser Code)"
                  id="lasorCode"
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
                  ข้อพเจ้าได้อ่านและตกลงตามข้อกำหนดและเงื่อนไขและรับทราบนโยบายความเป็นส่วนตัวซึ่งระบุวิธีการที่บริษัท
                  ฟินันเซียดิจิทัล แอสแซท จำกัด("บริษัท")
                </label>
              </div>
              <div>
                <span className="text-red-500 cursor-pointer">
                  อ่านรายละเอียดเพิ่มเติม
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className = "ti-btn ti-btn-primary ti-custom-validate-btn">Submit</Button>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
    // <Liveness />
    // <OtpEmailConfirm />
  );
}
