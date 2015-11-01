/* global require, describe, it */
'use strict';

var mpath = './../lib/pkgrc.js';


// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	expected = require( './fixtures/expected.json' ),
	pkgrc = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'pkgrc', function tests() {

	it( 'should export a function', function test() {
		expect( pkgrc ).to.be.a( 'function' );
	});

	it( 'should resolve a configuration file', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = pkgrc( '.beeprc', 'toml' );
		assert.deepEqual( actual, expected );

		actual = pkgrc( '.boop' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should resolve a configuration file by appending `rc`', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = pkgrc( 'beep', 'toml' );
		assert.deepEqual( actual, expected );

		process.chdir( dir );
	});

	it( 'should return `null` if unable to resolve a configuration file', function test() {
		assert.isNull( pkgrc( 'beepboopbobop' ) );
	});

});
