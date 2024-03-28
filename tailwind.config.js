/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'gray0': '#F5F5F5',
      'gray-text': '#656565',
      'gray1': '#EBEBEB',
      'gray2': '#EBE9F1',
      'gray3': 'rgba(0, 0, 0, 0.25)',
      'gray4': '#6b7280',
      'gray5': '#575758',
      'blue1' :'rgba(94, 111, 225, 0.13)',
      'cyan' : '#22d3ee',
      'red'  : '#f87171',
      'white': '#ffffff',
      'yellow' : 'rgba(241, 189, 108, 1)',
      'sky' : 'rgba(158, 231, 227, 1)',
      'purple': 'rgba(205, 149, 234, 1)'
    },
    extend: {
      boxShadow: {
        'popup': '0 35px 60px -15px rgba(0, 0, 0, 0.)',
      }
    },
    
  },
  plugins: [],
}