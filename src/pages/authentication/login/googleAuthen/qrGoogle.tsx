import React, { useState, useEffect } from "react";
import axios from "@/api/axios";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDispatch } from "react-redux";
import { setAuthenToken, setAuthenUser } from "@/redux/Action";
import { setCookies } from "@/lib/cookies";
import { TUser } from "../types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { consolelog, sleep } from "@/lib/utils";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";

export default function GoogleQr() {
  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");
  const [secretError, setSecretError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    consolelog(value, name);
    let tmp: string[] = [];
    if (message !== "") setMessage("");
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast(<Loading />, { autoClose: false, closeOnClick: false });
    axios
      .post(
        "/api/v1/authen/customers/verify",
        {
          otp: otp.join(""),
        },
        {
          headers: {
            Authorization: `Basic ${localStorage.getItem("basic")}`,
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          setMessage("totp is valid");
          dispatch(setAuthenToken(response.data.accessToken));
          setCookies(response.data.accessToken);
          const user: TUser = jwtDecode(response.data.accessToken);
          localStorage.clear();
          dispatch(setAuthenUser(user));
          toast.dismiss();
          await sleep();
          navigate(`${import.meta.env.BASE_URL}dashboard/personal`);
        } else {
          setMessage("totp is invalid");
          toast.dismiss();
        }
      })
      .catch((error) => {
        console.error("Error verifying totp:", error);
        setMessage(error.response.data.message);
        toast.dismiss();
      });
  };

  // Fetch the TOTP secret when the component mounts
  useEffect(() => {
    const secret = localStorage.getItem("secret");
    if (secret) {
      setSecret(secret);
    } else {
      setSecretError("Token not found, Please login again!");
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-10 px-2 md:px-0">
      <Card className="flex flex-col bg-white md:w-1/2 py-10">
        <h1 className="text-center font-bold text-2xl py-10 ">
          TOTP Authentication
        </h1>

        {secret ? (
          <div className="flex flex-col items-center ">
            <p className="text-center py-5">
              Scan this QR code with your authenticator app:
            </p>
            <QRCode
              // value={secret}
              value={`otpauth://totp/MyApp:user@example.com?secret=${secret}&issuer=MyApp`}
            />
          </div>
        ) : (
          <p className="text-center py-5 text-red-500">
            Error while getting secret value: {secretError}
          </p>
        )}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="userToken" className="flex justify-center py-5">
            Enter TOTP Token:
          </label>
          <div className="py-10">
            <div className="grid gap-y-4">
              <div className="grid grid-cols-6 gap-4 max-w-[20rem] mx-auto">
                <input
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
            </div>
          </div>
          <Button
            id="btn-submit"
            className="mx-auto w-1/2 bg-gray-600 text-white py-2 px-2 rounded-md hover:bg-blue-600 focus:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
            type="submit"
          >
            Verify
          </Button>
        </form>

        <div className="w-full flex justify-center pt-6">
          <p className="text-sm text-red-400">{message}</p>
        </div>
      </Card>
    </div>
  );
}
