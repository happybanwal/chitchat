module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      ['react-native-paper/babel'],
      ["nativewind/babel"],
    ],
    presets: ['babel-preset-expo'],
  };
};
