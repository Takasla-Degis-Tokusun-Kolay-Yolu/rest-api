const path = require('path');

module.exports = {
  // giriş dosyası
  entry: './api/v1/index.js',
  // çıkış dosyası
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};