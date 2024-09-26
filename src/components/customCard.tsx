import { TDataProps } from "@/pages/landing/type";

type TCustomCardProps = {
  data: TDataProps;
};

export function CustomCard({ data }: TCustomCardProps) {
  const normalText = "text-[0.8rem] md:text-base text-gray-400";
  const darkText = "text-[0.8rem] md:text-base text-gray-800";

  return (
    <div className="w-[280px] h-[350px] md:w-[380px] md:h-[520px] border border-gray-200 rounded-[30px] hover:cursor-pointer bg-white shadow-md">
      <div className="py-5 md:w-[360px] md:h-[500px] md:px-[10px] md:py-[10px] flex flex-col justify-evenly">
        <div className="w-full px-2 space-y-2 md:p-4 md:space-y-4">
          <div className="flex flex-row items-center space-x-4">
            <img src={data.logo} alt="" className="h-[17px] md:h-[34px]" />
            <h1 className={`text-md md:text-xl font-bold ${darkText}`}>
              Elite Consulting
            </h1>
          </div>
          <h2 className={normalText}>{data.issueBy}</h2>
          {/* <h2 className={normalText}>{data.issueBy}</h2> */}
          <div className="border-b border-gray-200"></div>
        </div>

        <div className="w-full p-2 md:p-4">
          <div className="flex flex-row bg-gray-100 rounded-2xl space-x-4 border border-gray-100">
            <div className="w-[140px] h-full">
              <img src={data.image} alt="" className="rounded-2xl" />
            </div>
            <div className="flex-grow justify-between pt-2 space-y-2">
              <div className={`${darkText} h-1/3 w-[140px]`}>{data.name}</div>
              <div
                className={`${normalText} w-[180px] h-2/3 line-clamp-2 md:line-clamp-3`}
              >
                {data.description}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4 space-y-4">
          <div className="flex justify-between">
            <p className={normalText}>Product Catagory</p>
            <p className={darkText}>{data.catagory}</p>
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
            <p className={darkText}>{data.minimum}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
