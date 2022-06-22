const dumpsterController = require('../controllers/dumpsterController');

const utils = require('./../../utils');
const this_file_name = "dumpsterRoutes.js";

module.exports = (app) => {
    app.route('/')
        .get(dumpsterController.rootByGet)

    app.route('/data')
        .get(dumpsterController.getData);

    app.route('/open')
        .get(dumpsterController.openDumpster)
        .post(dumpsterController.extendTimer);

    app.route('/close')
        .get(dumpsterController.closeDumpster);

    app.route('/activate')
        .get(dumpsterController.activate)

    app.route('/deactivate')
        .get(dumpsterController.deactivate)

    app.route('/isFull')
        .get(dumpsterController.isFull)

    app.route('/lastWeight')
        .get(dumpsterController.lastWeight)

    // app.route('/simulateThrowing')
    //     .get(dumpsterController.simulateThrowing)
}