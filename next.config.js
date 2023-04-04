/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    // defaults to TRUE, unless API Keys are set at build time; this flag is used by the UI
    REQUIRE_USER_API_KEYS: !process.env.OPENAI_API_KEY,
  },
  webpack(config, { isServer, dev }) {
    // @mui/joy: anything material gets redirected to Joy
    config.resolve.alias['@mui/material'] = '@mui/joy';

    // @dqbd/tiktoken: enable asynchronous WebAssembly
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

module.exports = nextConfig;
