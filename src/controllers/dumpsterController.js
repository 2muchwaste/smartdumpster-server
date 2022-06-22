const utils = require('./../../utils');
const moment = require('moment');
let data = require('./../../data/dumpsterData.json');
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

const rootByGet = (req,res) => {
    utils.print_log(this_file_name,"Root requested");
    res.send("Root returned!");
}

const getData = (req, res) => {
    utils.print_log(this_file_name,"getData requested");
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

module.exports = {
    rootByGet,
    getData,
    openDumpster,
    extendTimer
}
