const withImages = require('next-images');


module.exports = withImages({
    webpack(config, options) {
        return config
    },
    dynamicAssetPrefix: true,
    images: {
        disableStaticImages: true
    },
    env: {
        // API_URL: 'https://api.temir.ae',
        API_URL: 'http://0.0.0.0:8000',
        BASE_URL: 'https://temir.ae'
    }
});