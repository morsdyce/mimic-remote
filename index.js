#!/usr/bin/env node

const SocketCluster = require('socketcluster').SocketCluster;

const args = process.argv.slice(2);
let port = 5000;

if (args[1] && args[0] === '-p' || args[0] === '--port') {
  port = parseInt(args[1]);
}

new SocketCluster({
  workers: 1,
  brokers: 0,
  port,
  appName: 'bdsm',
  wsEngine: 'uws',
  workerController: __dirname + '/worker.js',
  rebootWorkerOnCrash: true
});

setTimeout(() => {
  console.log(`Started server at http://localhost:${port}`);
}, 500);

