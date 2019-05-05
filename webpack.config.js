const path = require('path');

const config = {
	mode: 'development', //环境
	entry: path.resolve(__dirname, 'src/index.jsx'), //当前目录src/index，打包目录
	output: { //打包输出目录
		path: path.resolve(__dirname, 'dist'), //当前目录下dist目录
		filename: 'main.js'  //打包后文件名
	},
	//定义loader（重点），定义在module下面的rules
	module: {
		rules: [{
			test: /\.jsx$/, //匹配所有jsx文件
			exclude: /node_modules/, //排除这个文件夹，不编译
			use: {
				loader: 'babel-loader', //使用babel-loader工具打包
				options: {
					presets: ['env', 'react'], //env开发环境，react支持jsx语法
					plugins: ['transform-decorators-legacy','transform-class-properties'] //处理类成员变量，修饰器decorator插件.
				}
			}
		}]
	},
	devtool: 'inline-source-map'
}

module.exports = config;