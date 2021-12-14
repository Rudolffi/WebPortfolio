const path = require('path');
module.exports = {
    outputDir : path.resolve(__dirname, 'server/public'),
    devServer : {
      proxy:{
          '/api' : {
              target : 'http://localhost:5000'
          }
      }
    },
    pages:{
        'index':{
            entry:'./src/pages/main/main.js',
            template:'public/index.html',
            title:'Portfolio',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        'new':{
            entry:'./src/pages/new/main.js',
            template:'public/index.html',
            title:'Project',
            chunks: ['chunk-vendors', 'chunk-common', 'new']
        },
        'login':{
            entry:'./src/pages/login/main.js',
            template:'public/index.html',
            title:'Login',
            chunks: ['chunk-vendors', 'chunk-common', 'login']
        }
    }
}