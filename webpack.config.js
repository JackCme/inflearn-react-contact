const webpack = require('webpack')
const path = require('path')

module.exports = {
    //react hot loader 사용하려면 엔트리 소스 보다 맨 위에 /patch 추가해줘야함.
    //https://gaearon.github.io/react-hot-loader/getstarted/#step-2-of-3-using-hmr-to-replace-the-root-component
    entry: ["react-hot-loader/patch", "./src/index.js"],

    //번들 파일이 컴파일되서 출력될 위치
    output: {
        path: path.resolve(__dirname, "/public/js"),
        filename: "main.js",
    },

    //웹팩 개발서버의 옵션
    devServer: {
        hot: true,
        inline: true,
        open: true,
        host: "localhost",
        port: 3030,
        contentBase: __dirname + "/public",
    },

    //바벨 코어가 7.x 버전부터는 웹팩에서 불러오는 형식이 달라졌음.
    //https://poiemaweb.com/es6-babel-webpack-2
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname),
                exclude: /node_modules/,
                use: [
                    //react-hot-loader의 웹팩 로더는 바벨보다 위에 있어야함.
                    //https://gaearon.github.io/react-hot-loader/getstarted/#step-2-of-3-using-hmr-to-replace-the-root-component
                    { loader: "react-hot-loader/webpack" },
                    { loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            //react 클래스에서 state 를 this로 사욛하려면 바벨의 해당 플러그인 필요함.
                            //https://github.com/babel/babel/issues/8655#issuecomment-419808044
                            plugins: ['@babel/plugin-proposal-class-properties'],
                        }
                    },
                ],
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}