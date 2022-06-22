/* La stringa è divers rispetto quella delle slide perchè il nome del controller fornito è diverso*/
const dumpsterController = require('../controllers/dumpsterController');
const utils = require('./../../utils');

let this_file_name = "dumpsterRoutes.js";

module.exports = (app) => {
    app.route('/')
        .get(dumpsterController.rootByGet)
        .post(dumpsterController.extendTimer);

    app.route('/open')
        .get(dumpsterController.openDumpster)
        .post(dumpsterController.extendTimer);

    app.route('/data')
        .get(dumpsterController.getData);
    //app.rout('/use')
    // app.route('/movies')
    //     .get(moviesController.readAllMovies)
    //     .post(moviesController.createMovie);
    //
    // app.route('/movies/:id')
    //      .get(dumpsterController.readMovie)
    //     .put(moviesController.updateMovie)
    //     .delete(moviesController.deleteMovie);
    
        //.get(moviesController.hello_world);
        // .post(moviesController.rootByPost);
    //app.routes('/movies')
    //     .get(moviesController.readAllMovies)
    //     .post(moviesController.createMovie)
}