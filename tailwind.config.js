module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      screens: {
     
          'sm': '640px',
          // => @media (min-width: 640px) { ... }
    
          'md': '768px',
          // => @media (min-width: 768px) { ... }
    
          'nd': '900px',

          'lg': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'xl': '1280px',
          // => @media (min-width: 1280px) { ... }
    
          '2xl': '1536px',
          // => @media (min-width: 1536px) { ... }
        
      
      },
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
