import React, { useState, useEffect } from "react";
import axios from "@/api/axios";
import { QRCodeSVG as QRCode } from "qrcode.react";

export default function GoogleQr() {
  const [secret, setSecret] = useState("");
  const [userToken, setUserToken] = useState("");
  const [message, setMessage] = useState("");
  const [secretError, setSecretError] = useState("");

  // Fetch the TOTP secret when the component mounts
  useEffect(() => {
    // axios
    //   .post("/api/v1/authen/totp/generate")
    //   .then((response) => {
    //     setSecret(response.data.secret);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching secret:", error);
    //     setSecretError(error.message);
    //   });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // axios
    //   .post("/api/v1/authen/totp/verify", {
    //     token: userToken,
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setMessage("token is valid");
    //     } else {
    //       setMessage("token is invalid");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error verifying token:", error);
    //   });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-bold text-2xl py-10 mt-10">
        TOTP Authentication
      </h1>

      {secret ? (
        <div className="flex flex-col items-center ">
          <p className="text-center py-5">
            Scan this QR code with your authenticator app:
          </p>
          <QRCode
            value={`otpauth://totp/MyApp:user@example.com?secret=${secret}&issuer=MyApp`}
            // value={`otpauth://totp/MyApp:user@example.com?secret=SUKWKY3NMQ2S3JZCBVRVLQ6IHU2U7DNQ&issuer=MyApp`}
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
          className="mx-auto w-1/3 border-2 py-2 px-2 rounded-md focus:border-blue-500 hover:border-blue-500 text-center my-5"
          id="userToken"
          type="text"
          value={userToken}
          onChange={(e) => setUserToken(e.target.value)}
          required
        />
        <button
          className="mx-auto w-1/3 bg-blue-600 text-white py-2 px-2 rounded-md hover:bg-gray-600"
          type="submit"
        >
          Verify Token
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
