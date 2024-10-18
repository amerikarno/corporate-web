import axios from "@/api/axios";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { setAuthenToken, setAuthenUser } from "@/redux/Action";
import { setCookies } from "@/lib/cookies";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TUser } from "../types";
import { Input } from "@/components/ui/Input";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";
import { sleep } from "@/lib/utils";

export default function QrVerification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string>("");

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let tmp: string[] = [];
    if (error !== "") setError("");
    switch (name) {
      case "one":
        tmp = [...otp];
        tmp[0] = value.slice(-1);
        setOtp(tmp);
        value !== "" && document.getElementById("two")?.focus();
        break;

      case "two":
        tmp = [...otp];
        tmp[1] = value.slice(-1);
        setOtp(tmp);
        value !== "" && document.getElementById("three")?.focus();
        break;

      case "three":
        tmp = [...otp];
        tmp[2] = value.slice(-1);
        setOtp(tmp);
        value !== "" && document.getElementById("four")?.focus();
        break;

      case "four":
        tmp = [...otp];
        tmp[3] = value.slice(-1);
        setOtp(tmp);
        value !== "" && document.getElementById("five")?.focus();
        break;

      case "five":
        tmp = [...otp];
        tmp[4] = value.slice(-1);
        setOtp(tmp);
        value !== "" && document.getElementById("six")?.focus();
        break;

      case "six":
        tmp = [...otp];
        tmp[5] = value.slice(-1);
        setOtp(tmp);
        value !== "" && document.getElementById("btn-submit")?.focus();
        break;

      default:
        break;
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpStr = otp.join("");
    toast(<Loading />, { autoClose: false, closeOnClick: false });
    axios
      .post(
        "/api/v1/authen/customers/verify",
        {
          otp: otpStr,
        },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("basic")}`,
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          dispatch(setAuthenToken(response.data.accessToken));
          setCookies(response.data.accessToken);
          const user: TUser = jwtDecode(response.data.accessToken);
          localStorage.clear();
          dispatch(setAuthenUser(user));
          toast.dismiss();
          await sleep();
          navigate(`/`);
        } else {
          toast.dismiss();
          setError("Network Error");
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Error verifying totp:", error);
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    document.getElementById("one")?.focus();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2">
        <Card className="mt-10 py-10 bg-white rounded-md shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Authenticator Verification
              </h1>
              <p className="mt-3 text-sm text-gray-60">
                Please enter the 6 digit code from your Google Authenticator
                App.
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={submit}>
                <div className="grid gap-y-4">
                  <div className="grid grid-cols-6 gap-4 max-w-[20rem] mx-auto">
                    <Input
                      type="text"
                      className="text-center py-2 px-3 block w-full border border-gray-400 rounded-md text-sm focus:border-primary focus:ring-primary"
                      required
                      id="one"
                      name="one"
                      onChange={handleOtp}
                      value={otp[0]}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border border-gray-400 rounded-md text-sm focus:border-primary focus:ring-primary"
                      required
                      id="two"
                      name="two"
                      onChange={handleOtp}
                      value={otp[1]}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border border-gray-400 rounded-md text-sm focus:border-primary focus:ring-primary"
                      required
                      id="three"
                      name="three"
                      onChange={handleOtp}
                      value={otp[2]}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border border-gray-400 rounded-md text-sm focus:border-primary focus:ring-primary"
                      required
                      id="four"
                      name="four"
                      onChange={handleOtp}
                      value={otp[3]}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border border-gray-400 rounded-md text-sm focus:border-primary focus:ring-primary"
                      required
                      id="five"
                      name="five"
                      onChange={handleOtp}
                      value={otp[4]}
                    />
                    <input
                      type="text"
                      className="text-center py-2 px-3 block w-full border border-gray-400 rounded-md text-sm focus:border-primary focus:ring-primary"
                      required
                      id="six"
                      name="six"
                      onChange={handleOtp}
                      value={otp[5]}
                    />
                  </div>
                  <div className="w-full flex justify-center">
                    <Button
                      id="btn-submit"
                      type="submit"
                      className="mx-auto w-1/2 bg-gray-600 text-white py-2 px-2 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
                      // className="mt-4 w-1/2 py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary focus:outline-none focus:ring-0 focus:ring-primary focus:ring-offset-0 transition-all text-sm dark:focus:ring-offset-white/10"
                    >
                      Verify
                    </Button>
                  </div>
                  <div className="w-full flex justify-center">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
