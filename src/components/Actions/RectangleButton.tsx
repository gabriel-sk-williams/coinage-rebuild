import { PropsWithChildren } from "react";
import cx from "classnames";

export interface BtnProps extends React.ComponentPropsWithoutRef<"button"> {
  analyticsProperty: string;
  color: "teal" | "orange";
}
export const RectangleButton: React.FC<PropsWithChildren<BtnProps>> = ({
  analyticsProperty,
  children,
  color,
  ...props
}) => {
  const buttonClass = cx(
    "border-[1px] p-2 border-coinage-stroke bg-coinage-white rounded-md flex-1 flex flex-col items-center subhead2 py-8 transition-colors",
    { "hover:bg-coinage-teal/10 hover:border-coinage-teal": color === "teal" },
    {
      "hover:bg-coinage-orange/10 hover:border-coinage-orange":
        color === "orange"
    }
  );
  return (
    <button
      className={buttonClass}
      data-splitbee-event={analyticsProperty}
      type={"button"}
      {...props}>
      {children}
    </button>
  );
};
