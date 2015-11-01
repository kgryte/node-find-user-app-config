/* global require, describe, it */
'use strict';

var mpath = './../lib/user.js';


// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	proxyquire = require( 'proxyquire' ),
	expected = require( './fixtures/expected.json' ),
	userConfig = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'user', function tests() {

	it( 'should export a function', function test() {
		expect( userConfig ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				userConfig( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values,
			i;

		values = [
			5,
			NaN,
			true,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				userConfig({
					'dir': value
				});
			};
		}
	});

	it( 'should, by default, resolve a configuration file having an application\'s name', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures' ) );

		actual = userConfig();
		assert.deepEqual( actual, expected );

		process.cwd( dir );
	});

	it( 'should, when unable to resolve a user configuration directory, resolve a configuration file having an application\'s name by walking up from the current working directory', function test() {
		var userConfig,
			actual,
			dir;

		userConfig = proxyquire( mpath, {
			'./configdir.js': configdir
		});

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userConfig();
		assert.deepEqual( actual, expected );

		process.cwd( dir );

		function configdir() {
			return null;
		}
	});

	it( 'should, when unable to resolve a user configuration directory, resolve a configuration file having a specified basename by walking up from the current working directory', function test() {
		var userConfig,
			actual,
			dir;

		userConfig = proxyquire( mpath, {
			'./configdir.js': configdir
		});

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures', 'bar', 'config' ) );

		actual = userConfig({
			'basename': 'beep',
			'fmt': 'toml'
		});
		assert.deepEqual( actual, expected );

		process.chdir( dir );

		function configdir() {
			return null;
		}
	});

	it( 'should resolve a configuration file having a specified basename', function test() {
		var actual,
			dir;

		dir = process.cwd();
		process.chdir( path.join( __dirname, 'fixtures' ) );

		actual = userConfig({
			'dir': process.cwd(),
			'basename': 'bop'
		});
		assert.deepEqual( actual, expected );

		process.cwd( dir );
	});

	it( 'should return `null` if unable to resolve a configuration file', function test() {
		assert.isNull( userConfig({
			'basename': 'beepboopbobop'
		}));
	});

});
