var serveStatic = require('serve-static');
var path        = require('path');
var SCWorker    = require('socketcluster/scworker');
var FileSync    = require('./fileSync');

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

      socket.on('sync-message', ({ type, payload }) => {
        switch(type) {
          case 'ADD_GROUP':
            FileSync.addGroup(payload);
            break;

          case 'UPDATE_GROUP':
            FileSync.updateGroup(payload);
            break;

          case 'REMOVE_GROUP':
            FileSync.removeGroup(payload);
            break;

          case 'ADD_MOCK':
          case 'DUPLICATE_MOCK':
            FileSync.addMock(payload);
            break;

          case 'UPDATE_MOCK':
          case 'RENAME_MOCK':
            FileSync.updateMock(payload);
            break;

          case 'REMOVE_MOCK':
            FileSync.removeMock(payload);
            break;

          case 'IMPORT':
            FileSync.import(payload);
            break;

          case 'LOAD_MOCKS_FROM_SYNC': {
            FileSync.loadDataFromFileSystem().then((payload) => {
              socket.emit('sync-message', { type: 'SET_DATA_FROM_FILE_SYSTEM', payload });
            });

          }

        }
      });
    });
  }
}

new Worker();
