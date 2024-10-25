import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export default function ReloginTokenExpired() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full py-20">
      <Card className="w-1/2 h-[250px] flex flex-col items-center justify-around mx-auto">
        <p className="text-center font-bold text-3xl text-gray-900">
          Please Login!
        </p>
        <p className="text-center font-bold text-lg text-gray-600">
          Session not found
        </p>
        <Button onClick={() => navigate("/authentication/login")}>Login</Button>
      </Card>
    </div>
  );
}
