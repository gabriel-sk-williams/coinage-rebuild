import cx from "classnames";
import { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  wrapperClassName?: string;
  inputClassName?: string;
  helperText?: {
    status: "error" | "info";
    message: string;
  };
}

export const InputWithLabel: React.FC<InputProps> = ({
  inputClassName,
  wrapperClassName,
  className,
  label,
  value,
  helperText,
  readOnly,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const isCaptionTop = (value && value !== "") || focused;

  const containerClassNames = cx(
    className,
    "transition-all flex flex-col rounded-lg px-4 py-2 border-coinage-stroke w-[320px] focus-within:border-coinage-blue body2 bg-white h-[46px] relative border-[1px]"
  );

  const labelClassName = cx(
    "text-coinage-body pointer-events-none absolute transition-all",
    {
      "caption top-[3px]": isCaptionTop,
      "top-[12px]": !isCaptionTop
    }
  );

  const inputClassNames = cx("outline-none peer mt-[12px]", inputClassName, {
    "cursor-not-allowed pointer-events-none": readOnly
  });
  const helperClassNames = cx("caption", {
    "text-coinage-orange": helperText?.status === "error",
    "text-coinage-body": helperText?.status !== "error"
  });
  return (
    <div className={wrapperClassName}>
      <fieldset className={containerClassNames}>
        <label className={labelClassName}>{label}</label>
        <input
          {...rest}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          type="text"
          className={inputClassNames}
          readOnly={readOnly}
        />
      </fieldset>
      {helperText && (
        <span className={helperClassNames}>{helperText.message}</span>
      )}
    </div>
  );
};
