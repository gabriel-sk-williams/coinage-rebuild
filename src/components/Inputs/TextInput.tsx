import cx from "classnames";
import { InputHTMLAttributes, ClassAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement>;

export const TextInput: React.FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      {...rest}
      className={cx(
        "rounded-l-md px-4 py-2 border-slate-50 focus:outline-slate-400",
        className
      )}
      type="text"
    />
  );
};
