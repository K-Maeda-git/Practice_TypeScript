// webpackの設定ファイル

const path = require("path");
// ①mini-css-extract-pluginの設定
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// ①html-webpack-pluginの設定
const HtmlWebpackPlugin = require("html-webpack-plugin");
// ①clean-webpack-pluginの設定(特定のクラスだけを読み込む場合は波括弧で囲う)
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// ①vue-loaderの設定
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  // modeを指定することでビルドするときにオプションの指定が不要となる
  mode: "development",
  devtool: "source-map",
  // エントリーポイント
  entry: "./src/javascripts/main.js",
  // 出力先
  output: {
    // 絶対パスの取得
    path: path.resolve(__dirname, "./dist"),
    // 出力先のファイル構成と名称の変更
    filename: "javascripts/main.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        // トランスファイルの対象外を指定
        exclude: /node_modules/,
        use: [
          {
            // ①ts-loaderの設定
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.vue/,
        // トランスファイルの対象外を指定
        exclude: /node_modules/,
        use: [
          {
            // ③vue-loaderの設定
            loader: "vue-loader",
          },
        ],
      },
      {
        test: /\.js/,
        // トランスファイルの対象外を指定
        exclude: /node_modules/,
        use: [
          {
            // babel-loaderの設定
            loader: "babel-loader",
            options: {
              presets: [
                // @babel/preset-envの設定
                // 対象の指定：シェア0.25%以上かつ公式サポートがされているもの
                ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                // @babel/preset-reactの設定
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        // ※loaderは下から適用されていくことに注意すること
        use: [
          {
            // // style-loaderの設定
            // loader: "style-loader",
            // ③mini-css-extract-pluginの設定(ローダーを差し替えている)
            loader: MiniCssExtractPlugin.loader,
          },
          {
            // css-loaderの設定
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            // sass-loaderの設定
            loader: "sass-loader",
          },
        ],
      },
      {
        // 正規表現でpngとjpgを指定
        test: /\.(png|jpg|jpeg)/,
        use: [
          {
            // // url-loaderの設定
            // loader: "url-loader",
            // file-loaderの設定(※url-loaderから切り替えた)
            loader: "file-loader",
            options: {
              esModule: false,
              // 保存先と名称の指定
              name: "images/[name].[ext]",
            },
          },
          {
            // image-webpack-loaderの設定
            loader: "image-webpack-loader",
            options: {
              // 圧縮率の指定
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            // html-loaderの設定
            loader: "html-loader",
          },
          {
            // pug-html-loaderの設定
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // ②vue-loaderの設定
    new VueLoaderPlugin(),
    // ②mini-css-extract-pluginの設定
    new MiniCssExtractPlugin({
      // 出力先のファイル構成と名称の変更
      filename: "./stylesheets/main.css",
    }),
    // ②html-webpack-pluginの設定
    new HtmlWebpackPlugin({
      // 参照元のパスを指定
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    // ②html-webpack-pluginの設定
    new HtmlWebpackPlugin({
      // 参照元のパスを指定
      template: "./src/templates/access.pug",
      filename: "access.html",
    }),
    // ②html-webpack-pluginの設定
    new HtmlWebpackPlugin({
      // 参照元のパスを指定
      template: "./src/templates/members/taro.pug",
      filename: "members/taro.html",
    }),
    // ②clean-webpack-pluginの設定
    new CleanWebpackPlugin(),
  ],
};
