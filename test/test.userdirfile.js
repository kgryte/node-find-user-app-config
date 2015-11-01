/* global require, describe, it */
'use strict';

var mpath = './../lib/userdirfile.js';


// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	expected = require( './fixtures/expected.json' ),
	userdirfile = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'userdirfile', function tests() {

	it( 'should export a function', function test() {
		expect( userdirfile ).to.be.a( 'function' );
	});

	it( 'should resolve a configuration file having a supported extension', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'bap.toml' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a hidden configuration file having a supported extension', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'bop.toml' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a hidden configuration file having a supported extension by walking up from the current working directory', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userdirfile( process.cwd(), 'bop.toml' );
		assert.deepEqual( actual, expected );

		actual = userdirfile( process.cwd(), '.bop.toml' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should resolve a hidden configuration file not having an extension by default as `ini`', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'boop' );
		assert.deepEqual( actual, expected );

		actual = userdirfile( dir, '.boop' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a hidden configuration file by appending `rc`', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'beep', 'toml' );
		assert.deepEqual( actual, expected );

		actual = userdirfile( dir, '.beep', 'toml' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve an extensionless configuration file and, by default, parse as `ini`', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'bup' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve an extensionless configuration file and parse according to a specified format', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'bip', 'toml' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a configuration file having a supported extension', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'bap' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a configuration file having a supported extension and ignore a provided format', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'bap', 'yaml' );
		assert.deepEqual( actual, expected );
	});

	it( 'should resolve a hidden configuration file having a supported extension', function test() {
		var actual,
			dir;

		dir = path.join( __dirname, 'fixtures' );

		actual = userdirfile( dir, 'bop' );
		assert.deepEqual( actual, expected );

		actual = userdirfile( dir, '.bop' );
		assert.deepEqual( actual, expected );
	});

	it( 'should walk up from the current working directory', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userdirfile( process.cwd(), 'beep', 'toml' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should return `null` if unable to resolve a configuration file', function test() {
		var dir = path.join( __dirname, 'fixtures', 'bar', 'config' );

		assert.isNull( userdirfile( dir, 'beepboopbobop' ) );
		assert.isNull( userdirfile( dir, '.beepboopbobop' ) );
		assert.isNull( userdirfile( dir, 'beepboopbobop.toml' ) );
		assert.isNull( userdirfile( dir, '.beepboopbobop.toml' ) );
	});

});
