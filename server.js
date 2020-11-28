const http = require('http');
const express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');



app.use(express.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 32323);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//SQL selectors
var getStatID = 'SELECT * FROM \`statistic\` WHERE stat_id= ';
var getCharAction =  'select name, description from action inner JOIN actionclass on actionclass.action_id = action.action_id where actionclass.class_id =';
var getCharInventory = 'select damage, effects, name, weight from inventory inner join charinventory on inventory.inventory_id = charinventory.inventory_id WHERE charinventory.character_id =';
var addInventItem = 'INSERT INTO inventory (name, damage, effects, weight) VALUES ( ?,?,?,?)';
var connectItemChar = 'INSERT INTO charinventory (inventory_id, character_id) VALUES (?,?)';
var addAbility = 'INSERT INTO action (name, description) VALUES (?, ?)';
var AddAbilityClass = 'INSERT INTO actionclass (action_id, class_id) VALUES (?, ?)';
var getClass = 'SELECT * FROM class';
var getInvent = 'SELECT * FROM inventory';

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

app.post('/addToAbilities', function(req,res, next){
  console.log('serverside Addto Abilities');
  context = {};
  var query = req.body;
  console.log(query);
  mysql.pool.query(addAbility, [query.name, query.description], function(err,result){
    if (err){
      next(err);
      return
    };
    console.log(result.insertId);
    mysql.pool.query(AddAbilityClass, [result.insertId, query.classID], function(err, result){
      if (err){
        next(err);
        return
      }
      mysql.pool.query(getCharAction + query.classID+";", function(err,result){
        if(err){
          next(err);
          return;
        }   
        context.actions = JSON.parse(JSON.stringify(result));
        res.send(context);
      })
    });
  });
});

app.post('/addToInventory', function(req, res, next){
  console.log('serverside AddtoInventory');
  context = {};
  var query =  req.body;
  console.log(query);
  mysql.pool.query(addInventItem , [query.name, query.damage, query.effect, query.weight], function(err, result){
    if (err){
      next(err);
      return
    };
    console.log(result.insertId);
    mysql.pool.query(connectItemChar,[result.insertId, query.charID], function(err, result){
      if (err){
        next(err);
        return
      };
      console.log(getCharInventory + query.charID+";");
      mysql.pool.query( getCharInventory + query.charID+";", function(err, result){
        if (err){
          next(err);
          return
        };
        context.inventory = JSON.parse(JSON.stringify(result));
        context.character_id = query.charID;
        res.send(context);
      })
    })
  })
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

      // Returns full Char information
      if (query.type == 'character'){
        var curChar = result[0];
        mysql.pool.query(getStatID + String(curChar.stat_id)+";", function(err, result){
          if(err){
            next(err);
            return;
          }   
          context.statBlock = JSON.parse(JSON.stringify(result));
          mysql.pool.query(getCharInventory + String(curChar.character_id) +";" , function(err, result){
            if(err){
              next(err);
              return;
            }   
            context.inventory = JSON.parse(JSON.stringify(result));
            mysql.pool.query(getCharAction + String(curChar.chosen_class_id)+";", function(err,result){
              if(err){
                next(err);
                return;
              }   
              context.actions = JSON.parse(JSON.stringify(result));
              res.send(context);
            })
          })
        })
      }
    });

});

app.get('/getClassInvent', function(req, res, next){
  console.log('inside class and inventory get');
  context = {};
  mysql.pool.query(getClass, function(err,result){
    if(err){
      next(err);
      return
    }
    context.classes = JSON.parse(JSON.stringify(result));
    mysql.pool.query(getInvent, function(err, result){
      if (err){
        next(err);
        return
      }
      context.inventory = JSON.parse(JSON.stringify(result));
      res.send(context);
    })
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