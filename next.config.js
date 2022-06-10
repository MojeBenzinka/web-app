/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // i18n
  i18n: {
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
    localeDetection: true,
  }
}

module.exports = nextConfig
