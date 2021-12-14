module.exports = {
    pages:{
        'index':{
            entry:'./src/pages/main/main.js',
            template:'public/index.html',
            title:'main',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        'new':{
            entry:'./src/pages/new/main.js',
            template:'public/index.html',
            title:'new',
            chunks: ['chunk-vendors', 'chunk-common', 'new']
        },
        'login':{
            entry:'./src/pages/login/main.js',
            template:'public/index.html',
            title:'login',
            chunks: ['chunk-vendors', 'chunk-common', 'login']
        }
    }
}