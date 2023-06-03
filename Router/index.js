const restMovies=require('./movies.js');
const restComment=require('./comment.js');
const restSession=require('./session.js');
const restUsuario=require('./usuarios-i.js');
const resRol=require('./rol.js');

function responApi(app){
    app.use('/movies', restMovies);
    app.use('/comment', restComment);
    app.use('/session', restSession);
    app.use('/usuarios', restUsuario);
    app.use('/rol', resRol);
}

module.exports=responApi;