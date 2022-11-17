const withLess = require('next-with-less'),
  withPWA = require('next-pwa');
const withPlugins = require('next-compose-plugins');
const nextTranslate = require('next-translate');

const { NODE_ENV } = process.env;

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins([
  [
    withPWA,
    {
      pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: NODE_ENV === 'development',
      },
    },
  ],
  [withLess],
  [nextTranslate],
]);

module.exports = nextConfig;
