module.exports = {
  chainWebpack: config => {
    config
      .plugin('copy')
      .tap(args => {
        // args are ([ ...patterns ], options)
        args[0].push({
            from: 'node_modules/@webcomponents/webcomponentsjs/*js',
            to: `webcomponentsjs`,
            flatten: true
        });
        return args
      })
  },
  devServer: {
    port: 5000,
    proxy: {
      '/nuxeo': {
        target: 'http://localhost:8080'
      }
    }
  },
}