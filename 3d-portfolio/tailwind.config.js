export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#4A90E2',
        'bg-minimal': '#FAFAFA',
        'dark-minimal': '#1F1F1F',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
