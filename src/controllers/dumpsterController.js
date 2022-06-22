const utils = require('./../../utils');
//const moment = require('moment');
const data = require('./../../data/dumpsterData.json');
const this_file_name = "dumpsterController.js";

let myTimer;
let dumpsterIsBeingUsed = false;

function simulateDumpsterClosing(){
    utils.print_log(this_file_name, 'Dumpster closing...');
}
function simulateDumpsterOpening(){
    utils.print_log(this_file_name, 'Dumpster opening...');
}

function extendableTimeout(fn, time){
    const id = setTimeout(fn, time);
    const timeStart = new Date();
    return {
        timerId: id,
        finishTime: timeStart.getTime() + time,
        extend: function(addingTime){
            clearTimeout(id);
            const elapsed = new Date() - timeStart;
            const newTime = addingTime + (time - elapsed);
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
    dumpsterIsBeingUsed = true;
    const openingTimeDumpster = 10000;
    simulateDumpsterOpening();
    myTimer = extendableTimeout(() => {
        utils.print_log(this_file_name,"Timer finished");
        simulateDumpsterClosing();
        dumpsterIsBeingUsed = false;
    }, openingTimeDumpster);

    res.json({ endingTime: myTimer.finishTime});
}

const extendTimer = (req, res) => {
    const timeData = req.body['time'];
    utils.print_log(this_file_name, "Timer to extend of: " + timeData + "ms");
    myTimer.extend(5000);
    res.send("Timer extended");
}

const closeDumpster = () => {
    simulateDumpsterClosing();
}

const activate = (req,res) => {
    if(!dumpsterIsBeingUsed){
        // TODO: Effettuare la scrittura sul json dell'informazione
        res.json({dumpsterWasActivate: true});
    } else {
        res.json({dumpsterWasActivate: false});
    }
}

const deactivate = (req,res) => {
    if(!dumpsterIsBeingUsed){
        // TODO: Effettuare la scrittura sul json dell'informazione
        res.json({dumpsterWasDeactivate: true});
    } else {
        res.json({dumpsterWasDeactivate: false});
    }
}



module.exports = {
    rootByGet,
    getData,
    openDumpster,
    extendTimer,
    closeDumpster,
    activate,
    deactivate
}
