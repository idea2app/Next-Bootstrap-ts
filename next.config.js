const withLess = require('next-with-less'),
  setPWA = require('next-pwa');

const { NODE_ENV } = process.env,
  withPWA = setPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: NODE_ENV === 'development',
  });

const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */

module.exports = module.exports = withPWA(
  withLess({
    ...nextTranslate(),
    reactStrictMode: true,
  }),
);
