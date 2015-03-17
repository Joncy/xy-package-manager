// xway App model
// by jesusdario
// CTO @ NetBeast

/* Requirements */
var fs = require('fs'); // filesystem
var rimraf = require('rimraf'); // nodejs rm -rf
var colors = require('colors'); // colourful prompt
var sp = require('./stringpolation').begin();
var ncp = require('ncp').ncp;
var exec = require('child_process').exec, child;

/* Application constructor */
function App(name) {
  var self = this;
  this.name = name;
}

/* Non-static methods and properties */
App.prototype = {
  constructor: App,
  new: function () {
    if (!fs.existsSync(this.name)){
      console.log("Creating app \"{s}\"...".sp({s: this.name}).green);
      ncp(__dirname + '/sampleapp', this.name, function (error) {
        if (error) {
          return console.error(error);
        }
        console.log('done!');
      });
    } else {
      console.log("Directory \"{s}\" already exists".sp({s: app.name}).red);
    }
  },
  rm: function () {
    var name = this.name;
    if (fs.existsSync(name)) {
      rimraf('./' + name, function(error) {
        if (error) {
          console.log(error);
        } else {
          console.log("Dir \"" + name + "\" was removed");
        }
      });
    } else {
    console.log("Directory \"{s}\" does not exists".sp({s: app.name}).red);
    }
  },
  pkg: function () {
    child = exec('tar -zcvf {app}.tar.gz .'.sp({app: this.name}) ,
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  },
  unpkg: function () {
    child = exec('tar -zxvf ' + this.name,
    function (error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
}

module.exports = App;
