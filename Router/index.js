const restMovies=require('./movies.js');
const restComment=require('./comment.js');
const restSession=require('./session.js');
const restUsuario=require('./usuarios-i.js');
const resRol=require('./rol.js');
const resFicha=require('./RouterFichaTecnica.js');
const resInsumo=require('./Routerinsumos.js');

function responApi(app){
    app.use('/movies', restMovies);
    app.use('/comment', restComment);
    app.use('/session', restSession);
    app.use('/usuarios', restUsuario);
    app.use('/rol', resRol);
    app.use('/ficha', resFicha);
    app.use('/insumo', resInsumo);
}

module.exports=responApi;