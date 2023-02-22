module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        { development: api.env('development'), runtime: 'automatic' }
      ]
    ],
    plugins: [api.env('development') && 'react-refresh/babel'].filter(Boolean)
  };
};
