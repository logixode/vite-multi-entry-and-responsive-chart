/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
   preflight: false,
  },
  content: [
    './src/**/*.{vue,js,html}',
  ],
  theme: {
    extend: {},
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "2px 2px 20px -7px rgba(0, 0, 0, 0.04), 0 1px 2px 0 rgba(0, 0, 0, 0.04)",
      md: "0 5px 35px -10px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 125px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 170px -3px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
    },
  },
  plugins: [],
}

