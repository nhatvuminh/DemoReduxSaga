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
          "@momoHeader/accountManagerment": "./src/screen/momo_header/AccountManagerment",
          "@screen/custom_view_native_ui": "./src/screen/custom_view_native_ui/index",
        },
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    'react-native-reanimated/plugin'
  ],
};
