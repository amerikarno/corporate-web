import { Input } from "@/components/ui/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
// import AzureForm from "./azureForm";
import { normalStyleInput } from "@/assets/css/normalStyleInput";
import axios from "@/api/axios";
import { AxiosError } from "axios";
import { consolelog } from "@/lib/utils";
import { setCookies } from "@/lib/cookies";
import { toast } from "react-toastify";
import { Loading } from "@/components/loading";

const LoginForm = () => {
  const navigate = useNavigate();

  const auth = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
  });

  type AuthForm = z.infer<typeof auth>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthForm>({
    resolver: zodResolver(auth),
  });

  const onSubmit: SubmitHandler<AuthForm> = async (data) => {
    if (data.email && data.password) {
      toast(<Loading />, { autoClose: false, closeOnClick: false });
      const dataStr = `${data.email},${data.password}`;
      const base64 = btoa(dataStr);
      try {
        const res = await axios.post(
          "/api/v1/authen/customers/login",
          {},
          {
            headers: {
              Authorization: `Basic ${base64}`,
            },
          }
        );

        if (res.status === 200) {
          toast.dismiss();
          consolelog(res.data);
          localStorage.setItem("basic", base64);
          if (res.data.secret !== "") {
            localStorage.setItem("secret", res.data.secret);
            navigate(
              `${import.meta.env.BASE_URL}authentication/login/google-authen/qr`
            );
          } else {
            navigate(
              `${
                import.meta.env.BASE_URL
              }authentication/login/google-authen/verify`
            );
          }
        } else {
          toast.dismiss();
          setError("root", { message: res.data.message });
          consolelog("error", { message: res.data });
        }
      } catch (error) {
        toast.dismiss();
        if (error instanceof AxiosError) {
          setError("root", { message: error.response?.data.message });
        }
        console.log(error);
        //TODO: remove mock
        setCookies(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMDgyY2I1LTAwYWUtNGM1NC1hMTg0LTQ3MzhmNTYyYmM5MiIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiZmViMzZiY2U0M2Q5MWI2MGU1ODVlMTQyODU0N2ZjZmRmZDI1ZWVmYjg4M2RkMGJiNTM5ZWNhOWRkZDNiMWM3NSIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpudWxsLCJwZXJtaXNzaW9ucyI6bnVsbCwicm9sZXMiOm51bGwsInVzZXJJZCI6IiIsImxvZ2luU3RhdHVzIjoiIiwiZXhwaXJlc0RhdGUiOiIyMDI0LTEwLTE1VDIwOjAxOjM4LjM0MzQ1MjMwMVoiLCJFcnJvciI6bnVsbCwiZXhwIjoxNzI5MDIyNDk4fQ.Ij50RCkNrLWvvn6yAW-3is7B3XHYv0fS7WGILd1qTZg"
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      {/* <AzureForm /> */}
      <form
        className="flex flex-col space-y-5 pt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
            {...register("email")}
            title="Email"
            name="email"
            label="Email"
            className={normalStyleInput}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            {...register("password")}
            title="Password"
            name="password"
            label="Password"
            className={normalStyleInput}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className=" w-full pt-10">
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
      </form>
    </>
  );
};

export default LoginForm;
