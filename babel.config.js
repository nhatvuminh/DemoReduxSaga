module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      "module-resolver"
      ,
      {
        "root": ["."],
        "alias": {
          "@globalStyles": "./src/globalStyles/index",
          "@colors": "./src/colors/index",
          "@contants": "./src/constants/Constants",
          "@getFootballers": "./src/saga/request/getFootballers",
        },
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    'react-native-reanimated/plugin'
  ],
};
