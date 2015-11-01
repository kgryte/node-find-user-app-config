/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	validate = require( './../lib/validate.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'validate', function tests() {

	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should return an error if provided an options argument which is not an object', function test() {
		var values,
			err,
			i;

		values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, values[ i ] );
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `dir` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'dir': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `basename` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'basename': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return an error if provided a `fmt` option which is not a string primitive', function test() {
		var values,
			err,
			i;

		values = [
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			err = validate( {}, {
				'fmt': values[ i ]
			});
			assert.isTrue( err instanceof TypeError );
		}
	});

	it( 'should return `null` if all options are valid', function test() {
		var opts,
			err;

		opts = {
			'basename': 'appie',
			'fmt': 'toml',
			'dir': '/.config'
		};

		err = validate( {}, opts );
		assert.isNull( err );

		// Unrecognized options:
		opts = {
			'beep': 'boop'
		};

		err = validate( {}, opts );
		assert.isNull( err );
	});

});
