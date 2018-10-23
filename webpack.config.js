const config = {

	mode : 'development',
	output:{
		publicPath: '/dist'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: ['babel-loader']
		},
		{
	        test: /\.css$/,
	        use: [ 'style-loader', 'css-loader' ]
		}]
	}
}

module.exports = config
