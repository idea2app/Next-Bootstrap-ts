const withLess = require('next-with-less'),
  withoutCSSImport = require('next-remove-imports'),
  withPWA = require('next-pwa');

const { NODE_ENV } = process.env;

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  ...withLess({
    reactStrictMode: true,
  }),
  ...withoutCSSImport(),
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: NODE_ENV === 'development',
  },
});
