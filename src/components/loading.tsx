import getImages from "@/common/imagesData";

export function Loading() {
  return (
    <div className="flex flex-row items-center">
      <img src={getImages("waiting")} alt="" /> Loading...
    </div>
  );
}
