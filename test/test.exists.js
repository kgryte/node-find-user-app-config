/* global require, describe, it */
'use strict';

var mpath = './../lib/exists.js';


// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	exists = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'exists', function tests() {

	it( 'should export a function', function test() {
		expect( exists ).to.be.a( 'function' );
	});

	it( 'should return an absolute path', function test() {
		var expected,
			actual,
			dir;

		dir = path.join( __dirname, 'fixtures', 'bar', 'config' );

		actual = exists( './test/fixtures/bar/config', 'test.toml' );

		expected = path.resolve( __dirname, './fixtures/bar/config/test.toml' );
		assert.strictEqual( actual, expected );
	});

	it( 'should return an absolute path (exts)', function test() {
		var expected,
			actual,
			dir;

		dir = path.join( __dirname, 'fixtures', 'bar', 'config' );

		actual = exists( './test/fixtures/bar/config', 'test', true );

		expected = path.resolve( __dirname, './fixtures/bar/config/test.toml' );
		assert.strictEqual( actual, expected );
	});

	it( 'should return `null` if unable to resolve a file path', function test() {
		assert.isNull( exists( __dirname, 'beepboop', false ) );
		assert.isNull( exists( __dirname, 'beepboop', true ) );
	});

});
