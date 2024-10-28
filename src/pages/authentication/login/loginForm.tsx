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
import { sleep } from "@/lib/utils";
// import { setCookies } from "@/lib/cookies";
import { toast } from "react-toastify";
import { Loading } from "@/components/loading";
// import { setCookies } from "@/lib/cookies";

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
      const loadingToast = toast(<Loading />, {
        autoClose: false,
        closeOnClick: false,
      });
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
          await sleep();
          console.log(res.data);
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
          toast.dismiss(loadingToast);
          toast.error("Failed to login");
          setError("root", { message: res.data.message });
          console.log("error", { message: res.data });
        }
      } catch (error) {
        console.log(error);
        toast.dismiss(loadingToast);
        toast.error("Network Error");
        if (error instanceof AxiosError) {
          setError("root", { message: error.response?.data.message });
        }
        //TODO: remove mock
        // await sleep();
        // setCookies(
        //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliODRjNzZkLWZlODQtNDExMy1iYTMwLTE3MDE0YTAyYjZiNSIsImN1c3RvbWVyQ29kZSI6IiIsImVtYWlsIjoiYWEyYzY5NjYzNDg2NDdmMzhjYmZiN2YyOWFiNDU5YzE3Zjc0MGZiNTdjYTJmZWIzODQwNDdhNTAzYmIxZTRmNiIsIm5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsImltYWdlIjoiIiwiZ3JvdXBzIjpbMTAwMSwxMDAyLDEwMDMsMTAwNCwxMDA1LDEwMDYsMTAwNywxMDA4LDEwMDksMTAxMCwyMDAxLDIwMDIsMjAwMywyMDA0LDIwMDUsMjAwNiwyMDA3LDIwMDgsMjAwOSwyMDEwLDIwMTEsMjAxMiwyMDEzLDIwMTQsMjAxNSwyMDE2LDIwMTcsMjAxOCwyMDE5LDIwMjAsMjAyMSwyMDIyLDMwMDEsMzAwMiwzMDAzLDMwMDQsMzAwNSwzMDA2LDMwMDcsMzAwOCwzMDA5LDMwMTAsMzAxMSwzMDEyLDMwMTMsMzAxNCw0MDAxLDQwMDIsNDAwMyw0MDA0LDQwMDUsNDAwNiw1MDAxLDUwMDIsNTAwMyw1MDA0LDUwMDUsNTAwNiw1MDA3LDUwMDgsNTAwOSw1MDEwLDUwMTEsNTAxMiw1MDEzLDUwMTQsNTAxNSw1MDE2LDUwMTcsNTAxOCw1MDE5LDUwMjAsNTAyMSw1MDIyLDUwMjMsNTAyNCw1MDI1LDUwMjYsNTAyNyw1MDI4LDUwMjksNTAzMCw1MDMxLDUwMzIsNTAzMyw1MDM0LDUwMzUsNTAzNiw1MDM3LDYwMDEsNjAwMiw2MDAzLDYwMDQsNjAwNSw2MDA2LDYwMDcsNjAwOCw3MDAxLDcwMDIsNzAwMyw3MDA0LDcwMDUsNzAwNl0sInBlcm1pc3Npb25zIjpbMTAxLDEwMiwxMDMsMjAxLDIwMiwyMDNdLCJyb2xlcyI6WzExLDEyLDEzLDIxLDIyLDIzLDMxLDMyLDMzXSwidXNlcklkIjoiIiwibG9naW5TdGF0dXMiOiIiLCJleHBpcmVzRGF0ZSI6IjAwMDEtMDEtMDFUMDA6MDA6MDBaIiwiRXJyb3IiOm51bGwsImV4cCI6MTcyOTkxMjI2NywiaWF0IjoxNzI5ODI1ODY3fQ.YxvZ9etZ-igTybFuGSblbUB9u0OzP593r_1DrCK-QvY"
        // );
        // navigate("/");
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
