module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#416262",
          300: "#101818",
          500: "#2b2d42",
          700: "#080C0C",
        },
        secondary: { DEFAULT: "#ebeeee" },
      },
      fontFamily: {
        logo: ["Jost"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
