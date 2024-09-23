import axios from "@/api/axios";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { setAuthenToken, setAuthenUser } from "@/redux/Action";
import { setCookies } from "@/util/Cookies";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types";
// import { Link } from "react-router-dom";

export default function QrVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let tmp: (number | null)[] = [];

    switch (name) {
      case "one":
        tmp = [...otp];
        tmp[0] = parseInt(value);
        setOtp(tmp);
        document.getElementById("two")?.focus();
        break;

      case "two":
        tmp = [...otp];
        tmp[1] = parseInt(value);
        setOtp(tmp);
        document.getElementById("three")?.focus();
        break;

      case "three":
        tmp = [...otp];
        tmp[2] = parseInt(value);
        setOtp(tmp);
        document.getElementById("four")?.focus();
        break;

      case "four":
        tmp = [...otp];
        tmp[3] = parseInt(value);
        setOtp(tmp);
        document.getElementById("five")?.focus();
        break;

      case "five":
        tmp = [...otp];
        tmp[4] = parseInt(value);
        setOtp(tmp);
        document.getElementById("six")?.focus();
        break;

      case "six":
        tmp = [...otp];
        tmp[5] = parseInt(value);
        setOtp(tmp);
        document.getElementById("btn-submit")?.focus();
        break;

      default:
        break;
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpStr = otp.join("");
    console.log(otpStr, typeof otpStr);

    axios
      .post("/api/v1/authen/totp/verify", {
        otp: otpStr,
        // token: userToken,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setAuthenToken(response.data.accessToken));
          setCookies(response.data.accessToken);
          const user: TUser = jwtDecode(response.data.accessToken);
          localStorage.clear();
          dispatch(setAuthenUser(user));
          navigate(`${import.meta.env.BASE_URL}dashboard/personal`);
        }
      })
      .catch((error) => {
        console.error("Error verifying totp:", error);
      });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/3">
        <Card className="mt-10 py-10 bg-white rounded-sm shadow-sm dark:bg-bgdark">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white pb-4">
                Authenticator Verification
              </h1>
              <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
                Please enter the 6 digit code from your Google Authenticator
                App.
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={submit}>
                <div className="grid gap-y-4">
                  <div className="grid grid-cols-6 gap-4 max-w-[20rem] mx-auto">
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                      required
                      id="one"
                      name="one"
                      maxLength={1}
                      onChange={handleOtp}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                      required
                      id="two"
                      name="two"
                      maxLength={1}
                      onChange={handleOtp}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                      required
                      id="three"
                      name="three"
                      maxLength={1}
                      onChange={handleOtp}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                      required
                      id="four"
                      name="four"
                      maxLength={1}
                      onChange={handleOtp}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                      required
                      id="five"
                      name="five"
                      maxLength={1}
                      onChange={handleOtp}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border-gray-200 rounded-sm text-sm focus:border-primary focus:ring-primary dark:bg-bgdark dark:border-white/10 dark:text-white/70"
                      required
                      id="six"
                      name="six"
                      maxLength={1}
                      onChange={handleOtp}
                    />
                  </div>
                  <Button
                    id="btn-submit"
                    type="submit"
                    className="mt-4 w-full py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                  >
                    Confirm
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
