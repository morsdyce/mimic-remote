var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

module.exports.run = function (worker) {
  var app = require('express')();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  app.set('view engine', 'ejs');
  app.use(serveStatic(path.resolve(__dirname, 'node_modules', 'mimic', 'dist')));

  app.get('/', function(req, res) {
    res.render('index', { port: worker.options.port });
  });

  httpServer.on('request', app);

  scServer.on('connection', function (socket) {

    socket.on('mimic-message', (message) => {
      scServer.exchange.publish('mimic-message', message);
    });

  });
};
