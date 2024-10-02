import { cn } from "@/lib/utils";

type TrowInfoProps = {
  title: string;
  value: string;
  className?: string;
};
export function RowInfo({ title, value, className }: TrowInfoProps) {
  return (
    <div className="w-full flex flex-row justify-between">
      <p className={cn("text-gray-400", className)}>{title}</p>
      <p className={cn("text-black", className)}>{value}</p>
    </div>
  );
}
