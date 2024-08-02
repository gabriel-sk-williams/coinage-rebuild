module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      letterSpacing: {
        max: "0.175em"
      },
      colors: {
        coinage: {
          red: '#f44336', //"#dc2626",
          offWhite: "#F2EEE4",
          orange: "#FF4517",
          black: "#1E1C1B",
          purple: "#C68FCC",
          burgundy: "#540505",
          blue: "#001C5B",
          blueAlt: "#03329C",
          blueAltLight: "#DFE1E7",
          gray: "rgba(30, 28, 27, 0.6)",
          teal: "#388697",
          stroke: "#D1D1D1",
          white: "#FFFFFF",
          body: "#757370",
          light: "#F7F5EF",
          offGray: "rgba(254, 251, 250, 0.6)"
        }
      },
      fontFamily: {
        "gt-trial": ["GT America Trial"],
        "gt-mono": ["GT America Mono"]
      },
      screens: {
        tab: "820px",
        lrg: "960px",
        xl: "1200px"
      }
    }
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = "") {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];

          const newVars =
            typeof value === "string"
              ? { [`--color${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`);

          return { ...vars, ...newVars };
        }, {});
      }
      addBase({
        ":root": extractColorVars(theme("colors"))
      });
    }
  ]
};
