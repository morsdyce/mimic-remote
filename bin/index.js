#!/usr/bin/env node
"use strict";

const listen = require('../index');
const args = process.argv.slice(2);
let port = 5000;

if (args[1] && args[0] === '-p' || args[0] === '--port') {
  port = parseInt(args[1]);
}

listen(port);

setTimeout(() => {
  console.log(`Started server at http://localhost:${port}`);
}, 500);

