var url = require('url');
var fs = require('fs');


var dataObj = {results: []};
var id = 0;
var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  if (request.url === '/'){
    // try{
    //   response.writeHead(200, {"Content-Type": "text/html"});
    //   fs.createReadStream('../client/client/index.html').pipe(response);
    // } finally {
    //   console.log(response);
    //   response.end();
    // }
    fs.readFile('../client/client/index.html', function(err, html){
      if(err){
        throw err;
      }
      response.writeHead(200, {"Content-Type":"text/html"});
      response.write(html);
    console.log(response);
    response.end();
    });
  }


  else if (request.method === 'GET' && request.url === '/classes/messages'){
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(dataObj));

  }

  else if (request.method === 'POST' && request.url === '/classes/messages'){
    console.log('Your POST request has been received!');
    statusCode = 201;
    response.writeHead(statusCode, headers);
    var body = '';
    request.on('data', function (data) {
      body += data;
    })
    request.on('end', function () {
      var messageObj = JSON.parse(body);
      messageObj.objectId = id;
      id++;
      dataObj.results.push(messageObj);
    });
    response.end();
  }

  else if (request.method === 'OPTIONS' && request.url === '/classes/messages'){
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();
  }

  else{
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }
  // The outgoing status.

  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // statusCode = 200;
  // response.writeHead(statusCode, headers);
  // response.end("Hello, World!!");
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
