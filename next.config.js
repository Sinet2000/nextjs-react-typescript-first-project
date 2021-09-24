module.exports = {
	images: {
		domains: ['courses-top.ru']
	},
	webpack(config, options) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: { and: [/\.(js|ts|md)x?$/] },

			use: ['@svgr/webpack'],
		});

		return config;
	},
};