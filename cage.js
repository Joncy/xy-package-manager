//
// Netbeast app tool suite
// By jesusdario, NetBeast CTO
// jesusdario.github.io
// twitter @_jesusdario
//=====================

var fs = require('fs'); // filesystem
var rimraf = require('rimraf'); // nodejs rm -rf
var colors = require('colors'); // colourful prompt
var argv = require('minimist')(process.argv.slice(2));
var sp = require('./stringpolation').begin();
//console.dir(argv);

var
app = {},       // Object that represents the app to create / manipulate
action = {}     // Object that stores action indexes in argv
;

// grab action index
action.new = argv._.indexOf("new");
action.remove = argv._.indexOf("remove");

if (action.new != -1) {
  app.name = argv._[action.new + 1];
  if (!fs.existsSync(app.name)){
    console.log("Creating app \"{s}\"".sp({s: app.name}).green);
    // Create the directory tree
    fs.mkdirSync(app.name);
    // Front-end
    fs.mkdirSync(app.name + '/views');
    fs.mkdirSync(app.name + '/assets');
    fs.mkdirSync(app.name + '/assets/js');
    fs.mkdirSync(app.name + '/assets/css');
    fs.mkdirSync(app.name + '/assets/img');
    // Backend
    fs.mkdirSync(app.name + '/models');
    fs.mkdirSync(app.name + '/controllers');
    // Copy the sample files
    fs.createReadStream('sample_index.html').pipe(
      fs.createWriteStream(app.name + '/index.html'));
    fs.createReadStream('sample_server.js').pipe(
      fs.createWriteStream(app.name + '/server.js'));
  } else {
    console.log("Directory \"{s}\" already exists".sp({s: app.name}).red);
  }
} else if (action.remove != -1) {
  app.name = argv._[action.remove + 1];
  if (fs.existsSync(app.name)){
    rimraf('./' + app.name, function(error){
      if (error) {
        console.log(error);
      } else {
        console.log("Dir \"{s}\" was removed".sp({s: app.name}).cyan);
      }
    });
  } else {
    console.log("Directory \"{s}\" does not exists".sp({s: app.name}).red);
  }
} else {
  console.log("Usage: new <app name>".yellow);
}
