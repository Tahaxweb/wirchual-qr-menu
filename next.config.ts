import type { NextConfig } from "next";
const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public', // PWA dosyalarının oluşturulacağı dizin
    disable: process.env.NODE_ENV === 'development', // Geliştirme modunda PWA'yı devre dışı bırak
  },
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
