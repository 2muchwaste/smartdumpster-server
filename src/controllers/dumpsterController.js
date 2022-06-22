const utils = require('./../../utils');
const moment = require('moment');
let data = require('./../../data/dumpsterData.json');
// let jsonAsArray = JSON.parse("" + data);
let this_file_name = "dumpsterController.js";
var myTimer;
function simulateDumpsterClosing(){
    utils.print_log(this_file_name, 'Dumpster closing...');
}
function simulateDumpsterOpening(){
    utils.print_log(this_file_name, 'Dumpster opening...');
}
//
function extendableTimeout(fn, time){
    var id = setTimeout(fn, time);
    var timeStart = new Date();
    // var timeFinish = new Date() + timeStart;
    // utils.print_log(this_file_name, "Timer will finish at: " + moment(timeFinish).format(myTimeFormat));
    return {
        timerId: id,
        finishTime: timeStart.getTime() + time,
        extend: function(addingTime){
            clearTimeout(id);
            var elapsed = new Date() - timeStart;
            var newTime = addingTime + (time - elapsed);
            setTimeout(fn, newTime);
            utils.print_log(this_file_name, "Elapsed time: " + elapsed);
            utils.print_log(this_file_name, "Setting new timeout: " + newTime);
        }
    }
}
//
//
// myTimer = extendableTimeout(() => {
//     utils.print_log(" Timer finished");
//     simulateDumpsterClosing();
// }, 5000);
// myTimer.extend(10000);
//
// function useTimer(time){
//     return new Promise(resolve => setTimeout(()=>resolve.call(), time));
// }
//
// async function prova() {
//     utils.print_log(this_file_name, 'Start test');
//     await useTimer(3000);
//     utils.print_log(this_file_name, 'End test');
// }

const rootByGet = (req,res) => {
    res.send("Root returned!");
}

const getData = (req, res) => {


    // utils.print_log(this_file_name, "Requested root");
    // prova();
    // utils.print_log(this_file_name, 'After prova');

    // utils.print_log(this_file_name, ciao);

    // if(ciao === "amici"){
    //     utils.print_log(this_file_name, 'ciao === "amici" vero');
    //     ciao = "nemici";
    // } else if (ciao === "nemici"){
    //     utils.print_log(this_file_name, 'ciao === "nemici" vero');
    //     ciao = "amici";
    // } else {
    //     utils.print_log(this_file_name, 'ciao diverso da amici e nemici');
    // }

    res.send(data);
};

const openDumpster = (req,res) => {
    const openingTimeDumpster = 10000;
    simulateDumpsterOpening();
    myTimer = extendableTimeout(() => {
        utils.print_log(this_file_name,"Timer finished");
        simulateDumpsterClosing();
    }, openingTimeDumpster);

    res.json({ endingTime: myTimer.finishTime});
}

const extendTimer = (req, res) => {
    const timeData = req.body['time'];
    utils.print_log(this_file_name, "Timer to extend of: " + timeData + "ms");
    myTimer.extend(5000);
    res.send("Timer extended");
}
// const readAllMovies = (req, res)=> {
//     utils.print_log(this_file_name,"All films returned");
//     res.json(data);
// };
//
// const readMovie = (req, res) => {
//     utils.print_log(this_file_name, "Requested film with ID: " + req.params.id);
//     let filmRequested = data.findIndex( item => {
//         return item.id == req.params.id;
//     });
//     if (filmRequested > -1){
//         utils.print_log(this_file_name, "Film returned");
//         res.json(data[filmRequested]);
//     } else {
//         utils.print_log(this_file_name, "Film not found");
//         res.status(404).json({description: ' Movie not found'});
//     }
// };
//
// const createMovie = (req, res) => {
//     const movie = req.body;
//     const n_items = data.length;
//     utils.print_log(this_file_name, "data: " + data);
//     utils.print_log(this_file_name, "req: " + req);
//     utils.print_log(this_file_name, "req[0]: " + req[0]);
//     utils.print_log(this_file_name, "req.body: " + req.body);
//     utils.print_log(this_file_name, "req.data: " + req.data);
//     utils.print_log(this_file_name, "movie: " + movie);
//     data.push(movie);
//     if (data.length > n_items) {
//         res.json({ description: 'New Movie Added' });
//     } else {
//         res.status(500).json({ description: 'error occurs adding a new movie' });
//     }
//
// }

module.exports = {
    rootByGet,
    getData,
    openDumpster,
    extendTimer
    // readAllMovies,
    // readMovie,
    // createMovie
}
