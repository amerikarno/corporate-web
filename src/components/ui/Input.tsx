import { cn } from "@/lib/utils";
import React from "react";
import { ComponentProps } from "react";

type TInputField = {
  id?: string;
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
  type?: string;
};

type TInputFieldProps = TInputField & ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, TInputFieldProps>(
  (
    { id, label, inputClassName, labelClassName, type = "text", ...props },
    ref
  ) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "block px-2.5 pb-2.5 pt-4 min-w-full h-[48px] text-sm text-gray-900 bg-white rounded-lg border border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-600 peer",
            inputClassName
          )}
          aria-describedby="outlined_success_help"
          placeholder=""
          id={id}
          {...props}
          ref={ref}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute text-sm text-gray-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto",
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
