
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        'xsm': { 'min': '270px', 'max': '324px' },
        'mobile': { 'min': '325px', 'max': '460px' },
        'tablet': {'min':'461px', 'max':'900px'},
        'laptop': { 'min': '901px', 'max': '1100px' },
        'desktop': { 'min': '1280px' }
      },
      colors : {
        'root-bg': 'rgb(241, 245, 249)'
      },
      spacing: {
        '144': '18px',
      }
    },
  },
  plugins: [],
}
