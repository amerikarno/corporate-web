import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockAssetData } from "./__mock__/mockAsset";
import { TAssetData } from "./types";
import LandingHeader from "@/layout/landing/landingHeader";

export function AssetDetails() {
  const assetId = useParams().id;
  console.log(assetId);
  const [assetData, setAssetData] = useState<TAssetData | undefined>(undefined);

  const fetchAssetData = async () => {
    setAssetData(mockAssetData);
  };

  useEffect(() => {
    if (!assetData) {
      fetchAssetData();
    }
  }, [assetData]);

  if (!assetData) {
    return <div>Loading...</div>;
  }

  return (
    <LandingHeader>
      <div className="w-full flex justify-center px-[30px] space-x-6">
        <div className="w-2/3 h-[2000px] bg-red-200"></div>
        <div className="w-1/3 h-[2000px] bg-yellow-200"></div>
      </div>
    </LandingHeader>
  );
}
