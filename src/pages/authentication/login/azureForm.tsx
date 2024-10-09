import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "@/api/axios";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { consolelog } from "@/lib/utils";

const AzureForm: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("access_token");

    if (token) {
      consolelog("Token:", token);
      setAccessToken(token);
    }
  }, [location.search]);

  const handleLogin = async () => {
    try {
      const res = await api.get("/api/v1/authen/login/azure", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      consolelog(res);
    } catch (error) {
      console.log(error);
    }
    window.location.href = "http://localhost:1323/api/v1/authen/login/azure";
  };

  useEffect(() => {
    if (accessToken) {
      consolelog("Access Token:", accessToken);
      axios
        .get("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          consolelog("User Data:", response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [accessToken]);

  return (
    <div className="space-y-4 pt-4">
      <h1 className="text-xl text-center">Microsoft Azure OAuth2 Login</h1>
      {!accessToken ? (
        <>
          <Button className="w-full" onClick={handleLogin}>
            Login with Microsoft
          </Button>
        </>
      ) : (
        <div>
          <h2>User Info</h2>
          {userData ? (
            <pre>{JSON.stringify(userData, null, 2)}</pre>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AzureForm;
