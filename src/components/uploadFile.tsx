import axios from "@/api/axios";
import { getCookies } from "@/lib/cookies";
import { setUploadFile } from "@/redux/slice/uploadFileSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "./ui/Button";
import { Loading } from "./loading";

export const FileUpload = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const fileToBase64 = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result.toString());
        } else {
          reject("File reading failed");
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async () => {
    toast.info(<Loading message="Uploading File..." />);
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    await axios
      .post("/api/v1/document/openaccount/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookies()}`,
        },
      })
      .then(async (res) => {
        if (res.status === 200) {
          const base64File = await fileToBase64(selectedFile);
          dispatch(setUploadFile(base64File));
          setSelectedFile(null);
        }
      })
      .catch(async (err) => {
        console.log(err);
        //TODO: remove mock
        const base64File = await fileToBase64(selectedFile);
        dispatch(setUploadFile(base64File));
      });
    toast.dismiss();
  };

  return (
    <div className="space-y-4">
      <input type="file" onChange={handleFileChange} />
      <Button
        className="bg-white text-gray-900 border border-gray-200 hover:bg-primary hover:text-white hover:border-primary focus:ring-primary dark:focus:ring-offset-white/10"
        onClick={handleUpload}
      >
        Upload
      </Button>
    </div>
  );
};
