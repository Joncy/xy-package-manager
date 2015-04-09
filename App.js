// xway App model
// by jesusdario
// CTO @ NetBeast

/* Requirements */
var fs = require('fs-extra'); // filesystem
var colors = require('colors'); // colourful prompt
var sp = require('./stringpolation').begin();
var path = require('path');
var exec = require('child_process').exec, child;
var targz = require('tar.gz');


/* Application constructor */
function App(name) {
  this.name = name;
}

var sampleDir = path.join(__dirname, 'sample-app');
var sampleTgz = path.join(__dirname, 'sample-app.tgz');
var currentDir = process.cwd();

/* Non-static methods and properties */
App.prototype = {
  constructor: App,
  new: function () {
    quitIfExists(this.name);
    var destination = path.join(currentDir, this.name);
    console.log("Creating app \"%s\"...".green, this.name);
    var extract = new targz().
    extract(sampleTgz, currentDir, function(err){
      if(err) {
        console.trace(err);
      }
      console.log('The extraction has ended!');
    });
  },
  rm: function () {
    var name = this.name;
    quitIfNotExists(name);
    fs.remove(path.join('./', name), function(error) {
      if (error) {
        console.log(error);
      } else {
        console.log("Dir \"%s\" was removed", name);
      }
    });
  },
  pkg: function (options) {
    var from = this.name || './';
    var to = options.to || path.join('./', 'application.tar.gz');
    quitIfNotExists(from);
    quitIfExists(to);
    console.log('Packaging app from %s to %s', from, to);
    var compress = new targz()
    .compress(from, to, function(err){
      if(err)
        console.log(err);

      console.log('The compression has ended!');
    });
  },
  unpkg: function (options) {
    var from = this.name || './';
    var to = options.to || path.join('./');
    quitIfNotExists(from);
    console.log('Unpackaging app from %s to %s', from, to);
    var extract = new targz().
    extract(from, to, function(err){
      if(err)
        console.log(err);
      console.log('The extraction has ended!');
    });
  }
}

function quitIfExists(file) {
  if(fs.existsSync(file)) {
    console.log("Directory \"%s\" already exists".red, file);
    process.exit(0);
  }
}

function quitIfNotExists(file) {
  if(!fs.existsSync(file)) {
    console.log("Directory \"%s\" does not exists".red, file);
    process.exit(0);
  }
}

module.exports = App;
