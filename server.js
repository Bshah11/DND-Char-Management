const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static("express"));

// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/express/index.html'));
    //__dirname : It will resolve to your project folder.
   });


const server = http.createServer(app);
//using process.argv[2] instead of listing port #. Must state port # after fileName (node fileName  port#)
const port = process.argv[2];
server.listen(port);

console.log('Server listening on http://flip3.engr.oregonstate.edu:' + port + ' ;press Ctrl-C to terminate.');