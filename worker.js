var serveStatic = require('serve-static');
var path        = require('path');
var SCWorker    = require('socketcluster/scworker');

class Worker extends SCWorker {
  run() {
    var app = require('express')();

    var httpServer = this.httpServer;
    var scServer   = this.scServer;

    app.set('view engine', 'ejs');
    app.use(serveStatic(path.resolve(__dirname, 'node_modules', 'mimic', 'dist')));

    app.get('/', (req, res) => {
      const indexPath = path.resolve(__dirname, 'views', 'index');
      res.render(indexPath, { port: this.options.port });
    });

    httpServer.on('request', app);

    this.scServer.on('connection', (socket) => {
      socket.on('mimic-message', (message) => {
        scServer.exchange.publish('mimic-message', message);
      });
    });
  }
}

new Worker();
