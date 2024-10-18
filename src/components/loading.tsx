import getImages from "@/common/imagesData";

type LoadingProps = {
  message?: string;
};

export function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex flex-row items-center">
      <img src={getImages("waiting")} alt="" /> {message}
    </div>
  );
}
