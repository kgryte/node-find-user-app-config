'use strict';

// MODULES //

var debug = require( 'debug' )( 'find-user-app-config:userfile' ),
	load = require( 'app-etc-load' ),
	extname = require( 'utils-extname' ),
	upsearch = require( 'utils-upsearch' ).sync;


// STRATEGY //

/**
* CASE 1: file name with extension but no format.
*
*	=> Search for `.<name>` starting from the current working directory.
*	=> If found, parse according to `<ext>`.
*
*
* CASE 2: file name with no extension and no provided format.
*
*	=> Search for `.<name>` and then `.<name>rc` starting from the current working directory.
*	=> If found, parse an `ini`.
*
*
* CASE 3: file name with extension and a format.
*
*	=> Search for `.<name>` starting from the current working directory.
*	=> If found, parse according to `<ext>`.
*
*
* CASE 4: file name with no extension but provided a format.
*
*	=> Search for `.<name>` and the `.<name>rc` starting from the current working directory.
*	=> If found, parse according to `<format>`.
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
		base,
		ext;

	ext = extname( name );
	if ( ext ) {
		fmt = ext;
	} else if ( !fmt ) {
		fmt = 'ini';
	}
	if ( name[ 0 ] === '.' ) {
		base = name;
	} else {
		base = '.' + name;
	}
	fpath = upsearch( base );
	if ( fpath ) {
		debug( 'Found a user configuration file: %s. Attempting to load and parse as `%s`...', fpath, fmt );
		return load( fpath, fmt );
	} else {
		debug( 'Unable to resolve a user configuration file with basename `%s`.', base );
	}
	if ( !ext ) {
		base += 'rc';
		fpath = upsearch( base );
		if ( fpath ) {
			debug( 'Found a user configuration file: %s. Attempting to load and parse as `%s`...', fpath, fmt );
			return load( fpath, fmt );
		} else {
			debug( 'Unable to resolve a user configuration file with basename `%s`.', base );
		}
	}
	debug( 'Unable to resolve a user configuration file.' );
	return null;
} // end FUNCTION resolve()


// EXPORTS //

module.exports = resolve;
