var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

module.exports.run = function (worker) {
  var app = require('express')();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  app.use(serveStatic(path.resolve(__dirname, 'static')));
  app.use(serveStatic(path.resolve(__dirname, 'node_modules', 'bdsm', 'dist')));

  httpServer.on('request', app);

  /*
   In here we handle our incoming realtime connections and listen for events.
   */
  scServer.on('connection', function (socket) {

    // Some sample logic to show how to handle client events,
    // replace this with your own logic

    socket.on('bdsm-message', (message) => {
      // console.log('bdsm-message', message.type);

      scServer.exchange.publish('bdsm-message', message);
    });

  });
};
