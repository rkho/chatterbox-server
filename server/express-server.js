var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');

var dataObj = {results: []};
var id = 0;

var app = express();

var port = 3000;
var ip = '127.0.0.1'

var routes ={
  '/classes/messages' : '/classes/messages',

};

var clientRoutes = {
  '/': '../client/client/index.html',
  '/styles/styles.css' : '../client/client/styles/styles.css'
}

app.use(cors());
app.use(bodyParser.json());

app.use(function(req,res, next){
  if (!routes[req.path]){
    res.status(404).end();
  } else {
    next();
  }
});

// for (var key in clientRoutes){
//   app.get(key, function(req,res){
//     fs.readFile(clientRoutes[key], function(err, html){
//       if(err){
//         throw err;
//       }
//     res.send(html);
//     });

//   });

// }

app.get(routes['/'], function(req,res){
  fs.readFile('../client/client/index.html', function(err, html){
    if(err){
      throw err;
    }
  res.type('html').send(html);
  });

});



app.get(routes['/classes/messages'], function(req, res){
  res.status(200).type('plain').end(JSON.stringify(dataObj));
  // console.log(res);
})

app.post(routes['/classes/messages'], function(req, res){
  req.body.objectId = id++;
  dataObj.results.push(req.body);
  res.status(201).end();
})


app.listen(port, ip);
