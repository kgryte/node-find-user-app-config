'use strict';

// MODULES //

var debug = require( 'debug' )( 'find-user-app-config:configdir' ),
	path = require( 'path' ),
	root = require( 'resolve-app-path' )(),
	configdir = require( 'utils-configdir' );


// USER DIR //

/**
* FUNCTION: resolve( dir )
*	Resolves a user configuration directory.
*
* @param {Void|String} dir - user configuration directory
* @returns {String|Null} resolved directory path or null
*/
function resolve( dir ) {
	var udir = dir || configdir();
	if ( udir === null ) {
		debug( 'Unable to resolve user configuration directory.' );
	} else {
		udir = path.resolve( root, udir );
		debug( 'User configuration directory: %s', udir );
	}
	return udir;
} // end FUNCTION resolve()


// EXPORTS //

module.exports = resolve;
