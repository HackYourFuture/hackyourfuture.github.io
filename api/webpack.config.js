const path = require('path');
module.exports = {
    entry: {
        main: `${__dirname}/main.js`
    },
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, "dist")
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env'],
                        plugins: [
                            ["transform-runtime", { "polyfill": false }]
                        ]
                    }
                }
            },
            {
                test: /\.txt|\.tpl$/,
                use: 'raw-loader'
            }
        ]
    }
};
