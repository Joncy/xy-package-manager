#!/usr/bin/env node

// Netbeast app tool suite
// By jesusdario, NetBeast CTO
// jesusdario.github.io
// twitter @_jesusdario
//=====================

var fs = require('fs'); // filesystem
var colors = require('colors'); // colourful prompt
var argv = require('minimist')(process.argv.slice(2));
var sp = require('./stringpolation').begin();
var App = require('./App');

//console.dir(argv);

var
app = {},       // Object that represents the app to create / manipulate
action = {}     // Object that stores action indexes in argv
;


// grab action index
action.new = argv._.indexOf("new");
action.remove = argv._.indexOf("rm");
action.package = argv._.indexOf("pkg");
action.unpackage = argv._.indexOf("unpkg");

if (action.new != -1) {
  app.name = argv._[action.new + 1];
  if (!fs.existsSync(app.name)){
    new App(app.name).new();
  } else {
    console.log("Directory \"{s}\" already exists".sp({s: app.name}).red);
  }
} else if (action.remove != -1) {
  app.name = argv._[action.remove + 1];
  if (fs.existsSync(app.name)){
    new App(app.name).rm();
  } else {
    console.log("Directory \"{s}\" does not exists".sp({s: app.name}).red);
  }
} else if (action.package != -1) {
  app.name = argv._[action.package + 1];
  new App(app.name).pkg();
}  else if (action.unpackage != -1) {
  app.name = argv._[action.unpackage + 1];
  new App(app.name).unpkg();
} else {
  console.log("Usage: new, rm, pkg <app name>".yellow);
}
