const restMovies=require('./movies.js');
const restComment=require('./comment.js');
const restSession=require('./session.js');

function responApi(app){
    app.use('/movies', restMovies);
    app.use('/comment', restComment);
    app.use('/session', restSession);
}

module.exports=responApi;