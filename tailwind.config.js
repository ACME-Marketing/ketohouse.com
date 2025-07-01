/** @type {import('tailwindcss').Config} */
export default {
  "content": [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "primary": "#FF4757",
        "secondary": "#FF6B81",
        "accent": "#4CD137",
        "background": "#F5F5F5",
        "text": "#212121",
        "success": "#4CD137",
        "warning": "#FF4757"
      },
      "fontFamily": {
        "sans": [
          "Inter",
          "system-ui",
          "sans-serif"
        ]
      }
    }
  },
  "plugins": [
    "@tailwindcss/typography"
  ]
}