import { MouseEventHandler, PropsWithChildren } from "react";
import Spinner from "../LoadingIndicators/Spinner";

import { ButtonModifiers, contentClassName, getButtonStyles } from "./shared";

export interface BtnProps extends React.ComponentPropsWithoutRef<"button"> {
  //analyticsProperty: string;
  modifier: ButtonModifiers;
  loading?: boolean;
}

export const Button: React.FC<PropsWithChildren<BtnProps>> = ({
  modifier,
  children,
  className,
  loading,
  type = "button",
  ...props
}) => {
  return (
    <button
      className={getButtonStyles(modifier, className)}
      type={type}
      {...props}>
      <span className={contentClassName}>
        {" "}
        {loading ? (
          <Spinner
            textColorClassName={
              modifier === "primary"
                ? "text-coinage-white"
                : "text-coinage-blue"
            }
          />
        ) : (
          children
        )}
      </span>
    </button>
  );
};

/*
export const Button: React.FC<PropsWithChildren<BtnProps>> = ({
  analyticsProperty,
  modifier,
  children,
  className,
  loading,
  type = "button",
  ...props
}) => {
  return (
    <button
      data-splitbee-event={analyticsProperty}
      className={getButtonStyles(modifier, className)}
      type={type}
      {...props}>
      <span className={contentClassName}>
        {" "}
        {loading ? (
          <Spinner
            textColorClassName={
              modifier === "primary"
                ? "text-coinage-white"
                : "text-coinage-blue"
            }
          />
        ) : (
          children
        )}
      </span>
    </button>
  );
};
*/
