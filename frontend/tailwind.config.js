/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        artsphereCoral: "#FF7F50",        // Main bright coral
        artsphereBlue: "#1E90FF",         // Main vivid blue
        artsphereSoftCoral: "#FFF1ED",    // Slightly lighter soft coral
        artsphereDarkBlue: "#005f99",     // Deep complementary blue
        artsphereLightGray: "#f7f7f7",    // Background gray for sections/cards
        artsphereAccentPink: "#FFD6D6",   // Soft accent pink
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'], // Clean Helvetica feel
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'strong': '0 4px 20px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}