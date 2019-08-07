module.exports = {
    // chainWebpack: config => {
    //     config.plugin('html').tap(args => {
    //         args[0].chunksSortMode = 'none'
    //         return args
    //     })
    // },
    chainWebpack: config => {
        config.module
            .rule('expose-loader')
            .test(/\.expose-loader$/)
            .use('expose-loader')
            .loader('expose-loader')
            .end()
    },
    runtimeCompiler: true,
}