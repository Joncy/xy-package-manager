#!/usr/bin/env node

// Netbeast app tool suite
// By jesusdario, NetBeast CTO
// jesusdario.github.io
// twitter @_jesusdario
//=====================

var App = require('./App');
var program = require('commander');

program
.version('1.1.1')
.command('rm <dir> [otherDirs...]')
.alias('uninstall').alias('remove')
.action(function (dir, otherDirs) {
	new App(dir).rm();
	if (otherDirs) {
		otherDirs.forEach(function (oDir) {
			console.log('rmdir %s', oDir);
			new App(oDir).rm();
		});
	}
});

program
.command('new <dir>')
.alias('create')
.action(function (dir) {
	new App(dir).new();
});

program
.command('pkg <app>')
.alias('package')
.option('-o, --to <path>', 'Output file name')
.action(function (app, options) {
	new App(app).pkg(options);
});

program
.command('unpkg <file>')
.alias('unpackage')
.option('-o, --to <path>', 'Output dir name')
.action(function (file, options) {
	new App(file).unpkg(options);
});

program
.command('scan')
.description('Find available xways in range and shows their IP')
.alias('discover')
.action(function () {
	require('node-libnmap').nmap('discover', function(err, report){
		if (err) throw err
			console.log(report)
	})
});


program.parse(process.argv);
