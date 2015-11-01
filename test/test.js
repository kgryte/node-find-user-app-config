/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	userConfig = require( './../lib' );


// VARIABLES //

var expect = chai.expect;


// TESTS //

describe( 'find-user-app-config', function tests() {

	it( 'should export a function', function test() {
		expect( userConfig ).to.be.a( 'function' );
	});

	it( 'should export a function to get/set a parser', function test() {
		expect( userConfig.parser ).to.be.a( 'function' );
	});

});
