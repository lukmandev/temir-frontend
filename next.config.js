const withImages = require('next-images');


module.exports = withImages({
    webpack(config, options) {
        return config
    },
    dynamicAssetPrefix: true,
    images: {
        disableStaticImages: true
    },
    // env: {
    //     API_URL: 'https://temir-backend.herokuapp.com',
    //     BASE_URL: 'http://localhost:3000'
    // }
});