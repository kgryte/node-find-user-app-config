'use strict';

var path = require( 'path' ),
	find = require( './../lib' );

// Change the current working directory...
process.chdir( path.join( __dirname, 'foo', 'bar', 'config' ) );

// Find a user application config...
var config = find({
	'basename': 'beep',
	'fmt': 'toml'
});
console.dir( config );
/*
	{
		'server': {
			'port': 8080,
			'address': '127.0.0.1',
			'ssl': true,
			'key': '',
			'cert': ''
		},
		'logger': {
			'level': 'debug'
		}
	}
*/

// Restore previous working directory:
process.chdir( __dirname );
