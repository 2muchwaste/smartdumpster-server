const utils = require('./../../utils');
//const moment = require('moment');
const dumpsterDataPath = './../../data/dumpsterData.json';
const this_file_name = "dumpsterController.js";

let myTimer;
let dumpsterIsBeingUsed = false;

function simulateDumpsterClosing(){
    utils.print_log(this_file_name, 'Dumpster closing...');
}
function simulateDumpsterOpening(){
    utils.print_log(this_file_name, 'Dumpster opening...');
}
function getDumpsterData(){
    return require(dumpsterDataPath);
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
    res.send(getDumpsterData());
};

const openDumpster = (req,res) => {
    utils.print_log(this_file_name,"openDumpster requested - open for " + getDumpsterData().openingSecondsDuration + " seconds");
    dumpsterIsBeingUsed = true;
    //const openingTimeDumpster = 10000;
    simulateDumpsterOpening();
    myTimer = extendableTimeout(() => {
        utils.print_log(this_file_name,"Timer finished");
        simulateDumpsterClosing();
        // TODO: set new last weight of dumpster
        dumpsterIsBeingUsed = false;
    }, getDumpsterData().openingSecondsDuration*1000);

    res.json({ endingTime: myTimer.finishTime});
}

const extendTimer = (req, res) => {
    utils.print_log(this_file_name,"extendTimer requested");
    const timeData = req.body['time'];
    utils.print_log(this_file_name, "Timer to extend of: " + timeData + "ms");
    myTimer.extend(5000);
    res.send("Timer extended");
}

const closeDumpster = (req,res) => {
    utils.print_log(this_file_name,"closeDumpster requested");
    simulateDumpsterClosing();
    res.send("Dumpster closing...");
}

const activate = (req,res) => {
    utils.print_log(this_file_name,"activate dumpster requested");
    if(!dumpsterIsBeingUsed){
        // TODO: Effettuare la scrittura sul json dell'informazione
        res.json({dumpsterWasActivate: true});
    } else {
        res.json({dumpsterWasActivate: false});
    }
}

const deactivate = (req,res) => {
    utils.print_log(this_file_name,"deactivate dumpster requested");
    if(!dumpsterIsBeingUsed){
        // TODO: Effettuare la scrittura sul json dell'informazione
        res.json({dumpsterWasDeactivate: true});
    } else {
        res.json({dumpsterWasDeactivate: false});
    }
}

const isFull = (req,res) => {
    utils.print_log(this_file_name,"isFull dumpster requested");
    const data = getDumpsterData();
    res.json({isFull:data.fillingPercentage >= data.usableUntilPercentage});
}

const lastWeight = (req,res) =>{
    utils.print_log(this_file_name,"lastWeight  dumpster requested");
    res.json({lastWeight:getDumpsterData().lastDropWasteWeight})
}

// const simulateThrowing = (req,res) => {
//     utils.print_log(this_file_name,"req.query.weight sent " + req.query.weight)
//     let wasteQuantityThrown = parseFloat(req.query.weight.replace(/,/,'.'))
//     utils.print_log(this_file_name,"Number sent " + wasteQuantityThrown)
//     utils.print_log(this_file_name,"Number sent " + (wasteQuantityThrown+1))
//
//
//     res.send("All ok");
// }

module.exports = {
    rootByGet,
    getData,
    openDumpster,
    extendTimer,
    closeDumpster,
    activate,
    deactivate,
    isFull,
    lastWeight,
    // simulateThrowing
}
