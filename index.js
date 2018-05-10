const SocketCluster = require('socketcluster');
const path = require('path');

function listen(port = 5000) {
  new SocketCluster({
    workers: 1,
    brokers: 0,
    port,
    appName: 'mimic',
    wsEngine: 'ws',
    workerController: path.join(__dirname, 'worker.js'),
    rebootWorkerOnCrash: true
  });
}

module.exports = listen;