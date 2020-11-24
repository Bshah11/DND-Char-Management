const http = require('http');
const express = require('express');
const path = require('path');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
const { strict } = require('assert');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.set('port', 32323); // Bhavin's branch

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//SQL selectors
var getStatID = 'SELECT * FROM \`statistic\` WHERE stat_id= ';
var getCharInventory =  'SELECT \`inventory_id\` FROM \`charinventory\` WHERE character_id=';
var getCharAction =  'SELECT \`action_id\` FROM \`actionclass\` WHERE class_id=';

app.get('/',function(req,res,next){
    context ={};
    res.render('home', context);
    });



//POST - passing data via body of req
app.post('/readByID', function(req,res, next){
    console.log("serverside readbyID")
    context = {};
    var query = req.body;
    var sqlQuery = 'select * from \`' + query.type + '\` where id = \'' + query.id +'\' ;';
    console.log(sqlQuery);
      mysql.pool.query (sqlQuery, function(err, result){
        if(err){
            next(err);
            return;
          }
        context.result = JSON.parse(JSON.stringify(result));
        context.type = query.type;
        res.send(context);
      });
    });



app.post('/readByName', function(req, res, next){
    // This post will represent the read functionality from our DB
    // It will take in the client side request (entity type and search string)
    // It will send back the object(s) found
    console.log("serverside getChar")
    context = {};
    var query = req.body;
    var sqlQuery = 'select * from \`' + query.type + '\` where name = \'' + query.name +'\' ;';
    console.log(sqlQuery);
    mysql.pool.query (sqlQuery, function(err, result){
      if(err){
          next(err);
          return;
      }
      console.log(result);
      context.result = JSON.parse(JSON.stringify(result));
      context.type = query.type;
      if (query.type == 'character'){
        var curChar = result[0];
        mysql.pool.query(getStatID + String(curChar.stat_id)+";", function(err, result){
          if(err){
            next(err);
            return;
          }   
          context.statBlock = JSON.stringify(result);
          mysql.pool.query(getCharInventory + String(curChar.character_id) +";" , function(err, result){
            if(err){
              next(err);
              return;
            }   
            context.inventory = JSON.stringify(result);
            mysql.pool.query(getCharAction + String(curChar.chosen_class_id)+";", function(err,result){
              if(err){
                next(err);
                return;
              }   
              context.actions = JSON.stringify(result);
              res.send(context);
            })
          })
        })
      }
    });

});

app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });
  
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });


/*
const server = http.createServer(app);
//using process.argv[2] instead of listing port #. Must state port # after fileName (node fileName  port#)
const port = process.argv[2];
server.listen(port);

console.log('Server listening on http://flip3.engr.oregonstate.edu:' + port + ' ;press Ctrl-C to terminate.');
*/