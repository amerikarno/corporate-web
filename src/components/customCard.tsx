import { Button } from "./ui/Button";
import { getCookies } from "@/lib/cookies";
import { useNavigate } from "react-router-dom";
import { Asset } from "@/pages/landing/types";
import getImages from "@/common/imagesData";
import { getAppName } from "@/lib/utils";

type TCustomCardProps = {
  data: Asset | null | undefined;
  index: number;
  type: string;
};

export function CustomCard({ data, index, type }: TCustomCardProps) {
  const normalText = "text-gray-400";
  const darkText = "text-gray-800";
  const token = getCookies();
  const navigate = useNavigate();

  if (!data || data === null) {
    return;
  }

  const handleCardClick = () => {
    localStorage.setItem("asset", `${type}-${index}`);
    navigate(`/asset/${type}/${index}`);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent the outer div's onClick event from being triggered
    localStorage.setItem("asset", `${type}-${index}`);
    navigate("/invest");
  };

  return (
    <div
      data-testid={`asset-card-${type}-${index}`}
      className="w-[380px] h-[520px] border border-gray-200 rounded-[30px] bg-white shadow-md flex justify-center hover:cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="w-[360px] h-[500px] flex flex-col justify-evenly">
        <div className="w-full px-2 space-y-2 p-2 md:space-y-4">
          <div className="flex flex-row items-center space-x-4">
            <img
              src={data.logo}
              alt=""
              className="h-[34px]"
              onError={(e) => (e.currentTarget.src = getImages("example"))}
            />
            <h1 className={`font-bold text-xl text-gray-800`}>
              {getAppName()}
            </h1>
          </div>
          <div className="flex flex-row justify-between">
            <h2
              className={`break-words ${normalText}`}
            >{`Issue By ${data.issueBy}`}</h2>
            {type === "Active" && (
              <Button
                className={`z-50 hover:font-bold hover:bg-primary-hover ${
                  token ? "" : "hidden"
                }`}
                onClick={handleButtonClick}
              >
                Invest
              </Button>
            )}
          </div>
          <div className="border-b border-gray-200"></div>
        </div>

        <div>
          <div className="w-full p-2 md:p-4">
            <div className="flex flex-row bg-gray-100 rounded-2xl space-x-4 border border-gray-100">
              <div className="w-1/3 h-full">
                <img
                  src={data.image}
                  alt=""
                  className="rounded-2xl"
                  onError={(e) => (e.currentTarget.src = getImages("example"))}
                />
              </div>
              <div className="w-2/3 pt-2 space-y-2]">
                <div className={`${darkText} break-words`}>{data.name}</div>
                <div className={`${normalText} break-words`}>
                  {data.description}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-4 space-y-4">
            <div className="flex justify-between">
              <p className={normalText}>Product Category</p>
              <p className={darkText}>{data.category}</p>
            </div>
            <div className="flex justify-between">
              <p className={normalText}>Expect Return</p>
              <p className={darkText}>{data.return}</p>
            </div>
            <div className="flex justify-between">
              <p className={normalText}>Region</p>
              <p className={darkText}>{data.region}</p>
            </div>
            <div className="flex justify-between">
              <p className={normalText}>Minimum Subscription Limit</p>
              <p className={`text-right ${darkText}`}>{data.minimum}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
