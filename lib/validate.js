'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} [options.dir] - user configuration directory
* @param {String} [options.basename] configuration directory which contains user application settings
* @param {String} [options.fmt] - format specifying how to parse a user configuration file
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'dir' ) ) {
		opts.dir = options.dir;
		if ( !isString( opts.dir ) ) {
			return new TypeError( 'invalid option. `dir` option must be a string primitive. Option: `' + opts.dir + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'basename' ) ) {
		opts.basename = options.basename;
		if ( !isString( opts.basename ) ) {
			return new TypeError( 'invalid option. `basename` option must be a string primitive. Option: `' + opts.basename + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'fmt' ) ) {
		opts.fmt = options.fmt;
		if ( !isString( opts.fmt ) ) {
			return new TypeError( 'invalid option. `fmt` option must be a string primitive. Option: `' + opts.fmt + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
