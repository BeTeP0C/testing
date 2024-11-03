module.exports = {
  presets: ['next/babel'],
  plugins: [
    // ... другие плагины
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ]
}
