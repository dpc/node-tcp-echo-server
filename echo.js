var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var net = require('net');

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  net.createServer(function(socket){
      socket.on('data', function(data){
          socket.write(data.toString())
      });
  }).listen(8001);
}
