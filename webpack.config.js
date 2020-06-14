module.exports = {
    module: {
        rules: [
            {
                test: /\.(mp4|webm|ogg)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
        ],
    },
};
