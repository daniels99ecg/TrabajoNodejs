const restMovies=require('./movies.js');
const restComment=require('./comment.js');
const restSession=require('./session.js');
const restUsuario=require('./usuarios-i.js');
const resRol=require('./rol.js');
const resFicha=require('./RouterFichaTecnica.js');
const resInsumo=require('./Routerinsumos.js');


const routerlistingSales = require('./routesListingSales');
const routerCollection2 = require('./routesCollection2');
const routerCollection3 = require('./routesCollection3');

const routerProductos=require('./productos.js');

function responApi(app){
    app.use('/movies', restMovies);
    app.use('/comment', restComment);
    app.use('/session', restSession);
    app.use('/usuarios', restUsuario);
    app.use('/rol', resRol);
    app.use('/ficha', resFicha);
    app.use('/insumo', resInsumo);


    app.use('/ventas', routerlistingSales);//La app que creamos con appexpress va a asociar "movies" con el controlador routesMovies
    app.use('/detalles', routerCollection2);
    app.use('/estado', routerCollection3);

    app.use('/productos', routerProductos);
}

module.exports=responApi;