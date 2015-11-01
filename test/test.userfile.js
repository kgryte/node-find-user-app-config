/* global require, describe, it */
'use strict';

var mpath = './../lib/userfile.js';


// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	expected = require( './fixtures/expected.json' ),
	userfile = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'userfile', function tests() {

	it( 'should export a function', function test() {
		expect( userfile ).to.be.a( 'function' );
	});

	it( 'should resolve a hidden configuration file and parse an `ini`', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userfile( 'boop' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should resolve a hidden configuration file by appending `rc`', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userfile( 'beep', 'toml' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should resolve a hidden configuration file having a supported extension', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userfile( '.bop.toml' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should ignore a format if a provided basename has a extension', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userfile( 'bop.toml', 'json' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should return `null` if unable to resolve a configuration file', function test() {
		assert.isNull( userfile( 'beepboopbobop' ) );
		assert.isNull( userfile( 'beepboopbobop.yml' ) );
	});

});
