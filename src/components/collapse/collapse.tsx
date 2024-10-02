import { ComponentProps, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type TCollapsisProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
};

export function Collapsis(props: TCollapsisProps & ComponentProps<"div">) {
  const { children, label, className } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div className="flex flex-row">
        <label
          htmlFor={props.id}
          className={`cursor-pointer pb-4 ${className}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {label}
        </label>
        {collapsed ? (
          <ChevronUp color="white" />
        ) : (
          <ChevronDown color="white" />
        )}
      </div>
      {collapsed ? children : null}
    </>
  );
}
