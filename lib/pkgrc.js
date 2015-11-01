'use strict';

// MODULES //

var debug = require( 'debug' )( 'find-user-app-config:pkgrc' ),
	load = require( 'app-etc-load' ),
	upsearch = require( 'utils-upsearch' ).sync;


// STRATEGY //

/**
* CASE 1: no provided format.
*
*	=> Search for `.<name>` and then `.<name>rc` starting from the current working directory.
*	=> If found, parse as `ini`.
*
*
* CASE 2: provided format.
*
*	=> Search for `.<name>` and then `.<name>rc` starting from the current working directory.
*	=> If found, parse according to `format`.
*/


// RESOLVE //

/**
* FUNCTION: resolve( name, fmt )
*	Searches for a user configuration file having a specified basename.
*
* @param {String} name - basename
* @param {Void|String} fmt - configuration file format
* @returns {Object|Null} configuration object or null
*/
function resolve( name, fmt ) {
	var fpath,
		base;

	fmt = fmt || 'ini';
	if ( name[ 0 ] !== '.' ) {
		base = '.' + name;
	} else {
		base = name;
	}
	fpath = upsearch( base );
	if ( fpath ) {
		debug( 'Found a user configuration file: %s. Attempting to load and parse as `%s`...', fpath, fmt );
		return load( fpath, fmt );
	} else {
		debug( 'Unable to resolve a user configuration file with basename `%s` by walking up from the current working directory.', base );
	}
	base += 'rc';
	fpath = upsearch( base );
	if ( fpath ) {
		debug( 'Found a user configuration file: %s. Attempting to load and parse as `%s`...', fpath, fmt );
		return load( fpath, fmt );
	} else {
		debug( 'Unable to resolve a user configuration file with basename `%s` by walking up from the current working directory.', base );
	}
	debug( 'Unable to resolve a user configuration file.' );
	return null;
} // end FUNCTION resolve()


// EXPORTS //

module.exports = resolve;
