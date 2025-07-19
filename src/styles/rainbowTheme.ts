import merge from "lodash.merge";
import { lightTheme, Theme } from "@rainbow-me/rainbowkit";

export const RainbowTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#001C5B",
    modalBackground: "#F2EEE4",
    closeButtonBackground: "transparent",
    closeButton: "#1E1C1B",
    actionButtonBorder: "transparent",
    actionButtonSecondaryBackground: "red"
  },
  fonts: {
    body: "GT America Trial"
  }
} as Theme);
