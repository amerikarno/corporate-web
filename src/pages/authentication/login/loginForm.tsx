import { Input } from "@components/ui/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
// import AzureForm from "./azureForm";
import { normalStyleInput } from "@/assets/css/normalStyleInput";
import axios from "@/api/axios";

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
      const dataStr = `${data.email},${data.password}`;
      const base64 = btoa(dataStr);
      console.log(base64);

      const decodeStr = atob(base64);
      console.log(decodeStr);

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
          setError("root", { message: res.data.message });
          console.log("error", { message: res.data });
        }
      } catch (error) {
        console.log(error);
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
