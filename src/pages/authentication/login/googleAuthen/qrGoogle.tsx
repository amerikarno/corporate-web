import React, { useState, useEffect } from "react";
import axios from "@/api/axios";
import { QRCodeSVG as QRCode } from "qrcode.react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useDispatch } from "react-redux";
import { setAuthenToken, setAuthenUser } from "@/redux/Action";
import { setCookies } from "@/util/Cookies";
import { TUser } from "../types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function GoogleQr() {
  const [secret, setSecret] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [message, setMessage] = useState("");
  const [secretError, setSecretError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the TOTP secret when the component mounts
  useEffect(() => {
    const secret = localStorage.getItem("secret");
    if (secret) {
      setSecret(secret);
      // axios
      //   .post("/api/v1/authen/totp/generate")
      //   .then((response) => {
      //     setSecret(response.data.secret);
      //   })
      //   .catch((error) => {
      //     console.error("Error fetching secret:", error);
      //     setSecretError(error.message);
      //   });
    } else {
      setSecretError("Secret not found, Please login again!");
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("/api/v1/authen/customers/verify", {
        otp: userOtp,
        // token: userToken,
      })
      .then((response) => {
        if (response.status === 200) {
          setMessage("totp is valid");
          dispatch(setAuthenToken(response.data.accessToken));
          setCookies(response.data.accessToken);
          const user: TUser = jwtDecode(response.data.accessToken);
          localStorage.clear();
          dispatch(setAuthenUser(user));
          navigate(`${import.meta.env.BASE_URL}dashboard/personal`);
        } else {
          setMessage("totp is invalid");
        }
      })
      .catch((error) => {
        console.error("Error verifying totp:", error);
      });
  };

  return (
    <div className="w-full flex justify-center my-10">
      <Card className="flex flex-col bg-white w-1/2 py-10">
        <h1 className="text-center font-bold text-2xl py-10 ">
          TOTP Authentication
        </h1>

        {secret ? (
          <div className="flex flex-col items-center ">
            <p className="text-center py-5">
              Scan this QR code with your authenticator app:
            </p>
            <QRCode
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
          <input
            className="mx-auto w-1/2 border-2 py-2 px-2 rounded-md focus:border-blue-500 hover:border-blue-500 text-center my-5"
            id="userToken"
            type="text"
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
            required
          />
          <Button
            className="mx-auto w-1/2 bg-blue-600 text-white py-2 px-2 rounded-md hover:bg-gray-600"
            type="submit"
          >
            Verify Token
          </Button>
        </form>

        {message && <p>{message}</p>}
      </Card>
    </div>
  );
}
