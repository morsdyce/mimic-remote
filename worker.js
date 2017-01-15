var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

module.exports.run = function (worker) {
  var app = require('express')();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  app.use(serveStatic(path.resolve(__dirname, 'static')));
  app.use(serveStatic(path.resolve(__dirname, 'node_modules', 'mimic', 'dist')));

  httpServer.on('request', app);

  scServer.on('connection', function (socket) {

    socket.on('mimic-message', (message) => {
      scServer.exchange.publish('mimic-message', message);
    });

  });
};
