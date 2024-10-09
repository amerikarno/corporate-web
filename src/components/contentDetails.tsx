import { cn } from "@/lib/utils";

type TConstenDetails = {
  header?: string;
  content?: string;
  headClass?: string;
  contentClass?: string;
};
export function ContentDetails({
  header,
  content,
  headClass,
  contentClass,
}: TConstenDetails) {
  return (
    <>
      <h1 className={cn("text-gray-900 font-bold", headClass)}>{header}</h1>
      <div className="h-2"></div>
      <span className={cn("md:pl-10 text-gray-400", contentClass)}>
        {content}
      </span>
    </>
  );
}
