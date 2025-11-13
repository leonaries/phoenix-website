/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Dynamic background images
    'bg-[url(/img/vector.svg)]',
    'bg-[url(/img/vector-2.svg)]',
    // Phoenix specific classes
    'phoenix-bg',
    'phoenix-gradient',
    'phoenix-text-gradient',
    // Common color utilities
    'bg-[#081122]',
    'text-[#fc9e01]',
    'text-[#ffffffcc]',
    'text-[#ffffffb2]',
    // RTL support classes
    'rtl:text-right',
    'rtl:flex-row-reverse',
    'ltr:text-left',
  ],
  theme: {
    extend: {
      colors: {
        "base-01": "var(--base-01)",
        "base-02": "var(--base-02)",
        "phoenix-dark": "#081122",
        "phoenix-orange": "#fc9e01",
        "phoenix-gradient-start": "#ffa700",
        "phoenix-gradient-end": "#d03d0a",
      },
      fontFamily: {
        'manrope': ['Manrope', 'Helvetica', 'Arial', 'sans-serif'],
        'montserrat': ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
      },
      minHeight: {
        'screen-tall': '6964px',
      },
    },
  },
  plugins: [
    // RTL support plugin
    function({ addVariant }) {
      addVariant('rtl', '[dir="rtl"] &')
      addVariant('ltr', '[dir="ltr"] &')
    }
  ],
};
