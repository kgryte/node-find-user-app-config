/* global require, describe, it */
'use strict';

var mpath = './../lib/userdir.js';


// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	expected = require( './fixtures/expected.json' ),
	userdir = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'userdir', function tests() {

	it( 'should export a function', function test() {
		expect( userdir ).to.be.a( 'function' );
	});

	it( 'should resolve a hidden configuration file (dot/rc)', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdir( dir, 'beeprc', 'toml' );
		assert.deepEqual( actual, expected );

		actual = userdir( dir, 'boop' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a configuration file by appending `rc`', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdir( dir, 'beep', 'toml' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a configuration file having a supported extension', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures', 'bar', 'config' );

		actual = userdir( dir, 'test', 'toml' );
		assert.deepEqual( actual, expected );

		actual = userdir( dir, 'test' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a hidden configuration file having a supported extension', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures', 'bar', 'config' );

		actual = userdir( dir, 'test2' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve an extensionless configuration file', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdir( dir, 'bip', 'toml' );
		assert.deepEqual( actual, expected );

		actual = userdir( dir, 'bup' );
		assert.deepEqual( actual, expected );
	});

	it( 'should walk up from the current working directory', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userdir( process.cwd(), 'beep', 'toml' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should return `null` if unable to resolve a configuration file', function test() {
		var dir = path.join( __dirname, 'fixtures', 'bar', 'config' );

		assert.isNull( userdir( dir, 'beepboopbobop' ) );
	});

});
