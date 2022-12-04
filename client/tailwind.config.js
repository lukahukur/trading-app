/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minWidth:{
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {
      spacing:{
        '128':'32rem',
        'tooooLarge':'800px',
        '19':'4.6rem',
        '22':'5.5rem',
        '1.5':'5px',
         "18":"4.5rem"
      },
      colors:{
        darkest:'hsl(230, 38%, 5%)',
        lessDarker:'hsl(230, 30%, 9%)',
        light:'#1e2433',
        smth:'#262D40',
        moreLighter:'#374151',
        lightest:'#475569',
        toxicBlue:'#26C6DA',
        toxicPurple:'#DA00B2',
        textMain:'white',
        textSecondary:'#9ca3af',
        up:'rgba(38,198,218, 0.56)',
        down:'rgba(239,83,80, 0.4)',
        secUp:'#047D74',
        secDown:"#D04749",
        sellColor:'#DA2C38',
        buyColor:'#00916E'
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      maxWidth:{
        '28':'7rem',
        '32':"8rem"
      },
      minWidth:{
        '28':'7rem',
        'minW':'5rem',
        'minWForm':'15rem'
      },
      zIndex: {
        '10000': '10000',
      }
    },
  },
  plugins: [],
}
