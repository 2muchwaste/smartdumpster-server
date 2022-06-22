/*
* Code example of a smart dumpster that communicate to central server to exchange data about its fullness and emptying.
*/
const express = require('express');
const app = express();
const routes = require('./src/routes/dumpsterRoutes');
const utils = require('./utils');
let port_number = 3030;
let this_file_name = 'index.js';
app.use(express.json());

routes(app);

/* Avviamo il server */
app.listen(port_number, ()=>{
    utils.print_log(this_file_name,'Listen on http://localhost:' + port_number);
});

