const manifest = require("./public/manifest.json");

module.exports = {
    productionSourceMap: false,
    pwa: {
        name: manifest.name,
        themeColor: manifest.theme_color,
        msTileColor: '#fff',
        manifestCrossorigin: 'use-credentials',
        assetsVersion: Date.now(),
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-icon-152x152.png',
            msTileImage: 'img/icons/msapplication-icon-144x144.png'
        },
        workboxOptions: {
            skipWaiting: true
        }
    },
    parallel: false
};
