/* global require, describe, it */
'use strict';

var mpath = './../lib/configdir.js';


// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	proxyquire = require( 'proxyquire' ),
	resolve = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'configdir', function tests() {

	it( 'should export a function', function test() {
		expect( resolve ).to.be.a( 'function' );
	});

	it( 'should return an absolute path', function test() {
		var expected,
			actual;

		actual = resolve( './test/fixtures/bar/config' );

		expected = path.resolve( __dirname, './fixtures/bar/config' );
		assert.strictEqual( actual, expected );
	});

	it( 'should return `null` if unable to resolve a user configuration directory', function test() {
		var resolve = proxyquire( mpath, {
			'utils-configdir': configdir
		});
		assert.isNull( resolve() );

		function configdir() {
			return null;
		}
	});

});
