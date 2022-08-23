const withLess = require('next-with-less'),
  removeCSSImport = require('next-remove-imports'),
  setPWA = require('next-pwa');

const { NODE_ENV } = process.env,
  withoutCSSImport = removeCSSImport(),
  withPWA = setPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: NODE_ENV === 'development',
  });

/** @type {import('next').NextConfig} */
module.exports = withPWA(
  withoutCSSImport(
    withLess({
      reactStrictMode: true,
    }),
  ),
);
