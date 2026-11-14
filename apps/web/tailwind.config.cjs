/** @type {import('tailwindcss').Config} */
const tokens = require('../../design-system/tokens.json');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // `bg-brand` / `bg-brand-dark` stay valid; shades are `brand-50` … `brand-900`.
        brand: {
          ...tokens.color.brand,
          DEFAULT: tokens.color.brand['500'],
          dark: tokens.color.brand['700']
        },
        ink: tokens.color.ink,
        accent: tokens.color.accent,
        success: tokens.color.semantic.success,
        warning: tokens.color.semantic.warning,
        danger: tokens.color.semantic.danger,
        info: tokens.color.semantic.info,
        surface: tokens.color.surface
      },
      fontFamily: {
        sans: tokens.font.sans,
        mono: tokens.font.mono
      },
      borderRadius: {
        control: tokens.radius.control,
        card: tokens.radius.card,
        panel: tokens.radius.panel
      },
      boxShadow: {
        card: tokens.shadow.card,
        raised: tokens.shadow.raised,
        brand: tokens.shadow.brand
      },
      maxWidth: {
        container: tokens.layout.containerMax
      }
    }
  }
};
