const path=require('path');
const autoprefixer=require('autoprefixer');
const HtmlPWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

module.exports={
  mode:'development',
  entry:'./src/app.js',
  devtool:'cheap-module-eval-source-map',
  devServer: {
     contentBase: './dist'
   },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'main.js',
    publicPath:''
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:/node_modules/
      },
      {
        test:/\.css$/,
        exclude:/node_modules/,
        use:[
          {loader:'style-loader'},
          {
            loader:'css-loader',
            options:{
              importLoaders:1
            }
          },
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              plugins:()=>[
                autoprefixer({
                browsers:[
                  ">1%",
                  "last 2 versions"
                ]
              })]
            }
          }
        ]
      },
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        loader:'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ]
  },
  plugins:[
    new HtmlPWebpackPlugin({
      template:__dirname+'/src/index.html',
      filename:'index.html',
      inject:'body'
    })
  ]
}
