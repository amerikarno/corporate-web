import { useState } from "react";
import { normalStyleInput } from "@/assets/css/normalStyleInput";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { getUser, sleep } from "@/lib/utils";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "@/components/loading";
import CryptoJs from "crypto-js";
import { getCookies } from "@/lib/cookies";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    repeatPassword: z
      .string()
      .min(8, "Repeat password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"], // path of error
  });

type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const changePassword = async (password: string) => {
    const user = getUser();
    if (user) {
      const loadingToast = toast(<Loading />, {
        autoClose: false,
        closeOnClick: false,
      });
      await axios
        .post(
          "/api/v1/user/individual/change/password",
          {
            customerCode: user.customerCode,
            password: CryptoJs.SHA256(password).toString(),
          },
          {
            headers: {
              Authorization: `Bearer ${getCookies()}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (res) => {
          toast.dismiss(loadingToast);
          if (res.status === 200) {
            await sleep();
            navigate("/");
          } else {
            toast.error("Failed to reset password");
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          toast.error("Network Error while resetting password");
          console.log(err);
          //TODO: remove link
          // navigate("/");
        });
    } else {
      toast.error("Missing user data");
    }
  };

  const onSubmit = async (data: TResetPasswordSchema) => {
    console.log("Form data:", data);
    await changePassword(data.password);
  };

  return (
    <div className="w-full h-full py-10 px-2 md:px-6 lg:px-10">
      <Card className="w-full md:w-4/5 lg:w-1/2 mx-auto">
        <CardHeader className="text-center font-bold text-lg text-gray-900">
          Reset Password
        </CardHeader>
        <CardContent className="space-y-6">
          <h1 className="text-gray-600">
            Enter your email address to reset your password
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Input
                label="New Password"
                className={normalStyleInput}
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`} />
              </button>
              {errors.password && (
                <p className="text-sm text-red-500 py-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                label="Repeat New Password"
                className={normalStyleInput}
                type={showPassword ? "text" : "password"}
                {...register("repeatPassword")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={togglePasswordVisibility}
              >
                <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`} />
              </button>
              {errors.repeatPassword && (
                <p className="text-sm text-red-500 py-2">
                  {errors.repeatPassword.message}
                </p>
              )}
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
