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
        API_URL: 'https://api.temir.ae',
        BASE_URL: 'https://temir.ae'
    }
});