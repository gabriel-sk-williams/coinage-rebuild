import cx from "classnames";

export type ButtonModifiers = "primary" | "secondary" | "tertiary" | "flagged" | "text";
export type LinkModifiers = ButtonModifiers;

export const contentClassName = "translate-y-[2px] z-10";

const sharedClassNames =
  "px-6 py-2 rounded-3xl inline-flex btn border-[1px] border-coinage-blue disabled:cursor-not-allowed text-center min-w-[120px] min-h-[42px] justify-center w-full tab:w-max max-w-[500px] transition-all";

  /*
const linkBaseNames = // border-[1px] rounded-3xl
  "px-6 py-2 inline-flex btn border-coinage-blue disabled:cursor-not-allowed text-center min-w-[120px] min-h-[42px] justify-center w-full tab:w-max max-w-[500px] transition-all";
  */

const linkBaseNames =
  "px-0 py-0 inline-flex btn border-coinage-blue disabled:cursor-not-allowed text-center min-w-[120px] min-h-[42px] justify-center w-full tab:w-max max-w-[500px] transition-all";

const buttonClassNamesPerModifier = {
  primary:
    "btn-hover primary bg-coinage-blue text-coinage-offWhite active:border-coinage-blueAlt active:bg-coinage-blueAlt disabled:border-coinage-body disabled:bg-coinage-body",
  secondary:
    "btn-hover secondary bg-coinage-offWhite text-coinage-blue active:bg-coinage-blueAltLight disabled:text-coinage-body disabled:border-coinage-body",
  tertiary: // hover:border-current hover:border-b-[1px]
    "border-0 border-solid rounded-none border-b-[1px] flex text-coinage-blue gap-2 px-0 py-0 pb-1 items-center min-w-[1px] border-transparent rounded-none min-h-fit w-max hover:underline",
  text:
    "flex text-coinage-blue gap-2 px-0 py-0 pb-1 items-center min-w-[1px] border-transparent hover:border-current min-h-fit w-max hover:underline",
  flagged:
    "btn-hover secondary border-coinage-orange text-coinage-blue active:bg-coinage-blueAltLight disabled:text-coinage-body disabled:border-coinage-body",
};

/*
<p class="mono2 text-coinage-gray mb-[15px] tab:flex tab:gap-[10px] tab:flex-row tab:ml-auto mt-auto tab:mb-auto mr-[15px]"><a class="px-6 py-2 rounded-3xl inline-flex btn border-[1px] border-coinage-blue disabled:cursor-not-allowed text-center min-w-[120px] min-h-[42px] justify-center w-full tab:w-max max-w-[500px] transition-all border-0 border-solid rounded-none border-b-[1px] flex text-coinage-blue gap-2 px-0 py-0 pb-1 items-center min-w-[1px] border-transparent hover:border-current hover:border-b-[1px] min-h-fit w-max" data-splitbee-event="privacy" href="/roadmap#FAQ"><span class="translate-y-[2px] z-10">FAQs</span></a> <a class="px-6 py-2 rounded-3xl inline-flex btn border-[1px] border-coinage-blue disabled:cursor-not-allowed text-center min-w-[120px] min-h-[42px] justify-center w-full tab:w-max max-w-[500px] transition-all border-0 border-solid rounded-none border-b-[1px] flex text-coinage-blue gap-2 px-0 py-0 pb-1 items-center min-w-[1px] border-transparent hover:border-current hover:border-b-[1px] min-h-fit w-max" data-splitbee-event="privacy" href="/press"><span class="translate-y-[2px] z-10">PRESS</span></a> <span class="hidden tab:flex">|</span> </p>
*/

export const getButtonStyles = (
  modifier: ButtonModifiers,
  className?: string
) => {
  return cx(sharedClassNames, buttonClassNamesPerModifier[modifier], className);
};

export const getLinkStyles = (modifier: LinkModifiers, className?: string) => {
  return cx(sharedClassNames, buttonClassNamesPerModifier[modifier], className);
};

export const getTextStyles = (modifier: LinkModifiers, className?: string) => {
  return cx(linkBaseNames, buttonClassNamesPerModifier[modifier], className);
};