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
// import { OtpEmailConfirm } from "./otpEmailConfirm/otpEmailConfirm";

export default function AddIndividualAccount() {
  // if (!isAllowedPage(2002)) {
  //   return <UnAuthorize />;
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TIndividualAccount>({
    resolver: zodResolver(individualAccountSchema),
  });

  const navigate = useNavigate();
  // const calculateAge = (birthDate: Date) => {
  //   const today = new Date();
  //   const age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();
  //   if (
  //     monthDiff < 0 ||
  //     (monthDiff === 0 && today.getDate() < birthDate.getDate())
  //   ) {
  //     return age - 1;
  //   }
  //   return age;
  // };

  const onSubmit = async (data: TIndividualAccount) => {
    console.log(data);
    // let body = { ...data, birthDate: new Date(data.birthDate), pageId: 100 };
    // console.log(body);
    navigate(`${import.meta.env.BASE_URL}Authentication/signup/basicinfo`);
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
    <div className="p-4 flex justify-center">
      <Card className="w-1/2">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
            <div className="space-y-4 pt-8">
              <h1 className="text-lg font-bold underline-offset-1 underline pb-4">
                กรอกข้อมูลส่วนตัว
              </h1>
              <div className="flex flex-col">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <div>
                      <select
                        {...register("thTitle")}
                        className="cursor-pointer hover:bg-slate-100 block px-2.5 w-full text-sm text-gray-600 bg-white py-3 rounded"
                      >
                        <option value="">คำนำหน้าชื่อ (ภาษาไทย)</option>
                        <option value="นาย">นาย</option>
                        <option value="นาง">นาง</option>
                        <option value="นางสาว">นางสาว</option>
                      </select>
                    </div>
                    {errors.thTitle && (
                      <span className="text-red-500">
                        {errors.thTitle.message}
                      </span>
                    )}
                  </div>
                  <div className="w-1/2"></div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("thName")}
                    placeholder="ชื่อ (ภาษาไทย)"
                    id="thName"
                    className="ti-form-input"
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
                    className="ti-form-input"
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
                    className="cursor-pointer hover:bg-slate-100 block px-2.5 py-3 rounded w-full text-sm text-gray-600 bg-white"
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
                <div className="w-1/2"></div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    {...register("engName")}
                    placeholder="ชื่อ (ภาษาอังกฤษ)"
                    id="engName"
                    className="ti-form-input"
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
                    className="ti-form-input"
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
                  className="ti-form-input"
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
                  className="ti-form-input"
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
                  className="ti-form-input"
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
                  className="cursor-pointer border px-2.5 py-3 rounded border-gray-700 text-gray-600 pl-2 hover:bg-slate-100"
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
                  className="ti-form-input"
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
                  className="ti-form-input"
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
    // <Liveness />
    // <OtpEmailConfirm />
  );
}
