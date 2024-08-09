import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import axios from "./api/axios";
import { isAxiosError } from "axios";

function App() {
  const [secret, setSecret] = useState("");
  const [userToken, setUserToken] = useState("");
  const [message, setMessage] = useState("");
  const [secretError, setSecretError] = useState("");
  const userEmail = "example@example.com";
  const controllerRef = useRef<AbortController | null>(null);
  const color = message === "token is valid" ? "green" : "red";

  // Fetch the TOTP secret when the component mounts
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    axios
      .post("/api/v1/authen/totp/generate", {
        "email": userEmail
      }, {
        signal: controller.signal
      })
      .then((response) => {
        setSecret(response.data.secret);
        console.log(response.data.secret);
      })
      .catch((error) => {
        if (isAxiosError(error) && error.code === 'ECONNABORTED') {
          console.log('Request canceled');
        } else {
          console.error("Error fetching secret:", error);
          setSecretError(error.message);
        }
      });
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("/api/v1/authen/totp/verify", {
        email: userEmail,
        token: userToken,
      })
      .then((response) => {
        if (response.status === 200) {
          setMessage("token is valid");
        } else {
          setMessage("token is invalid");
        }
      })
      .catch((error) => {
        console.error("Error verifying token:", error);
        setMessage("Token is invalid");
      });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center font-bold text-2xl py-10 mt-10">
        TOTP Authentication
      </h1>

      {secret ? (
        <>
          <p className="text-center">Scan this QR code with your authenticator app:</p>
          <QRCode
            className="mx-auto my-5"
            value={`otpauth://totp/MyApp:${userEmail}?secret=${secret}&issuer=MyApp`}
          />
        </>
      ) : (
        <p className="text-center py-5 text-red-500">
          Error while getting secret value: {secretError}
        </p>
      )}

      {<p style={{ color }} className="text-center col">{message}</p>}
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
        <button className="mx-auto w-1/3 bg-blue-600 text-white py-2 px-2 rounded-md hover:bg-gray-600" type="submit">Verify Token</button>
      </form>

    </div>
  );
}

export default App;
