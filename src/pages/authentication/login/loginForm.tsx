import { Input } from "@components/ui/Input";
import CryptoJs from "crypto-js";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@components/ui/Button";
import { useNavigate } from "react-router-dom";
import { setCookies } from "@/util/Cookies";
import api from "@/api/axios";
// import AzureForm from "./azureForm";
import { setAuthenEmail, setAuthenToken, setAuthenUser } from "@/redux/Action";
import { TUser } from "./types";
import { normalStyleInput } from "@/assets/css/normalStyleInput";
import axios from "@/api/axios";

const LoginForm = () => {
  const token = useSelector((state: any) => state.token);
  const dispatch = useDispatch();
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
          "/api/v1/customers/login",
          {},
          {
            headers: {
              Authorization: `Basic ${base64}`,
            },
          }
        );

        if (res.status === 200) {
          console.log(res.data);
          // setCookies(res.data.accessToken);
          // const user: TUser = jwtDecode(res.data.accessToken);
          // dispatch(setAuthenUser(user));
          // localStorage.clear();
          if (res.data.secret !== "") {
            localStorage.setItem("secret", res.data.secret);
            localStorage.setItem("basic", base64);
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

      // dispatch(setAuthenEmail(data.email));
      // const hashedUsername = CryptoJs.SHA256(data.email).toString();
      // const hashedPassword = CryptoJs.SHA256(data.password).toString();
      // console.log(hashedUsername);
      // console.log(hashedPassword);
      //
      // api
      //   .post(
      //     "/api/v1/authen/login",
      //     {
      //       hashedUsername: `${hashedUsername}`,
      //       hashedPassword: `${hashedPassword}`,
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       withCredentials: true,
      //     }
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     dispatch(setAuthenToken(res.data.accessToken));
      //     setCookies(res.data.accessToken);
      //     const user: TUser = jwtDecode(res.data.accessToken);
      //     localStorage.clear();
      //     dispatch(setAuthenUser(user));
      //     navigate(`${import.meta.env.BASE_URL}dashboard/personal`);
      //   })
      //   .catch((err) => {
      //     setError("root", { message: err.message });
      //   });
      // console.log(token);
      // if (token) {
      //   const decoded = jwtDecode(token);
      //   console.log(decoded);
      // }
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
