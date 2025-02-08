const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EA3819",
        secondary: "#2E2E2E",
        liteOrange: "rgba(234, 56, 25, 0.2)",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), 
    function ({ addUtilities }) {
        const newUtilities = {
          '.scrollbar-none': {
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        };
        addUtilities(newUtilities);
      },
  ],
};
