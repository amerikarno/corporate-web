import { cn } from "@/util/util";

type TConstenDetails = {
  header: string;
  content: string;
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
      <h1 className={cn("text-black", headClass)}>{header}</h1>
      <br />
      <span className={cn("pl-10 text-gray-400", contentClass)}>{content}</span>
    </>
  );
}
