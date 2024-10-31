import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { FileUpload } from "@/components/uploadFile";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export function VerifyHighNetwork() {
  const uploadFile = useSelector((state: RootState) => state.uploadfile);

  const handleSubmit = () => {
    console.log("uploadFile", uploadFile);
  };

  return (
    <div className="w-full px-2 py-10">
      <Card className="w-full md:w-4/5 lg:3/4 xl:w-1/2 mx-auto">
        <CardHeader className="font-bold text-2xl text-gray-950">
          High Network Verification
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-gray-600font-bold">
            As a valueable member. Please verify yourself for your safety
          </div>
          <div className="text-gray-600 pt-6">
            Please uploading your identity
          </div>
          <div>
            <FileUpload />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit}>Confirm</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
