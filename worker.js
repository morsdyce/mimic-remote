var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);

  var app = require('express')();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  app.use(serveStatic(path.resolve(__dirname, 'static')));
  // app.use(serveStatic(path.resolve(__dirname, 'node_modules', 'bdsm', 'dist')));
  app.use(serveStatic('/Users/maayan/projects/shredderjs/dist'));

  httpServer.on('request', app);

  var count = 0;

  /*
   In here we handle our incoming realtime connections and listen for events.
   */
  scServer.on('connection', function (socket) {

    // Some sample logic to show how to handle client events,
    // replace this with your own logic

    console.log('a client has connected');

    socket.on('bdsm-message', (message) => {
      // console.log('bdsm-message', message.type);

      // if (message.type === 'REQUEST_CAPTURED') {
        console.log('publishing', message.type);
        scServer.exchange.publish('bdsm-message', message);
      // }
    })

  });
};
