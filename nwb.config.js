module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'WebsitePerformanceHoc',
      externals: {
        react: 'React'
      }
    }
  }
}
