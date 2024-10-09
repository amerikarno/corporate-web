import { TAssetData } from "@/pages/landing/types";
import { CustomCard } from "./customCard";

type IcoListItemProps = {
  title: string;
  data: TAssetData[] | null | undefined;
};

export function IcoListItem({ title, data }: IcoListItemProps) {
  if (!data || data === null) {
    return;
  }

  return (
    <>
      <div className="max-w-screen-s1 s2:max-w-[840px] s3:max-w-[1280px] mx-auto s2:px-[10px]">
        <h1 className="px-4 pt-4 text-left font-bold text-3xl">{title}</h1>
      </div>
      <div className="max-w-screen-xl s2:max-w-[840px] s3:max-w-[1280px] mx-auto grid justify-items-center grid-cols-1 s2:grid-cols-2 s3:grid-cols-3">
        {data.map((item, index) => (
          <div className="py-2 s2:py-4 s3:py-8" key={index}>
            <CustomCard data={item.asset} index={index} type={title} />
          </div>
        ))}
      </div>
    </>
  );
}
