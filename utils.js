const moment = require("moment");
exports.print_log = (file_name, message) => {
    // console.log("[" + new Date().toLocaleString('it-IT') + "] FROM FILE "
    //     + file_name + " LOG: " + message);
    console.log("[" + moment().format('YYYY/MM/DD - HH:mm:ss:SSS') + "] FROM FILE "
        + file_name + " LOG: " + message);
    // console.log("[" + (new Date).getTime() + "] FROM FILE "
    //     + file_name + " LOG: " + message);
};