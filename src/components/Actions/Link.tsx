import NextLink from "next/link";
import { PropsWithChildren } from "react";
import { contentClassName, getTextStyles, getLinkStyles, LinkModifiers } from "./shared";
import ExternalLink from "../../assets/ExternalLink.svg";
import CopyIcon from "../../assets/Copy.svg";
import Arrow from "../../assets/Arrow.svg";

import cx from "classnames";

export interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {
  modifier: LinkModifiers;
  disabled?: boolean;
  isWrapped?: boolean;
}

export const IconWithLabel: React.FC<{
  iconLeft?: boolean;
  textClassName?: string;
  icon: "external" | "copy" | "arrow";
  label: string;
  className?: string;
}> = ({ iconLeft, label, icon, className, textClassName }) => {
  const classes = cx(className, "flex items-center gap-2 translate-y-[-2px]", {
    "flex-row-reverse": iconLeft
  });

  const renderIcon = () => {
    switch (icon) {
      case "external":
        return <ExternalLink width="24" />;
      case "copy":
        return <CopyIcon width="24" />;
      case "arrow":
        return <Arrow width="24" className={iconLeft ? "rotate-180" : ""} />;
    }
  };
  return (
    <span className={`${classes} ${textClassName}`}>
      {label}
      {renderIcon()}
    </span>
  );
};

export const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  modifier,
  href,
  children,
  className,
  disabled,
  isWrapped,
  ...rest
}) => {
  const regEx = /^http/;
  if (!href) return null;
  const isExternal = regEx.test(href);

  const linkClassNames = modifier === "text" 
    ? getTextStyles(modifier, className) 
    : getLinkStyles(modifier, className);

  if (isWrapped)
    return (
      <span className={linkClassNames} {...rest}>
        <span className={contentClassName}>{children}</span>
      </span>
    );

  if (isExternal)
    return (
      <a
        className={linkClassNames}
        href={href}
        target="_blank"
        rel="noreferrer"
        {...rest}>
        <span className={contentClassName}>{children}</span>
      </a>
    );

  return (
    <NextLink
      className={linkClassNames}
      href={href}
      {...rest}>
      <span className={contentClassName}>{children}</span>
    </NextLink>
  );
};
