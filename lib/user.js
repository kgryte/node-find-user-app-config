'use strict';

// MODULES //

var debug = require( 'debug' )( 'find-user-app-config:main' ),
	pkg = require( 'resolve-app-pkginfo' ).sync(),
	configDir = require( './configdir.js' ),
	pkgrc = require( './pkgrc.js' ),
	userFile = require( './userfile.js' ),
	userDir = require( './userdir.js' ),
	userDirFile = require( './userdirfile.js' ),
	validate = require( './validate.js' );


// USER //

/**
* FUNCTION: user( [options] )
*	Searches for, loads, and parses a user configuration.
*
* @param {Object} [options] - function options
* @param {String} [options.dir] - user configuration directory
* @param {String} [options.basename] - user configuration file basename
* @param {String} [options.fmt] - user configuration file format
* @returns {Object|Null} user configuration object or null
*/
function user( options ) {
	var opts = {},
		udir,
		err;

	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	// Resolve a user configuration directory...
	udir = configDir( opts.dir );

	// Case 1:
	if (
		udir === null &&
		opts.basename === void 0
	) {
		debug( 'No user configuration directory or file basename. Will attempt to resolve a configuration file having a basename equal to the application name: `%s`. Beginning walk up from the current working directory...', pkg.name );
		return pkgrc( pkg.name, opts.fmt );
	}
	// Case 2:
	if (
		udir === null &&
		opts.basename
	) {
		debug( 'No user configuration directory, but provided a file basename. Will attempt to resolve a configuration file having the provided basename: `%s`. Beginning walk up from the current working directory...', opts.basename );
		return userFile( opts.basename, opts.fmt );
	}
	// Case 3:
	if ( opts.basename === void 0 ) {
		debug( 'Resolved a user configuration directory, but not provided a file basename. Will attempt to resolve a configuration file having a basename equal to the application name: `%s`. Beginning search...', pkg.name );
		return userDir( udir, pkg.name, opts.fmt );
	}
	// Case 4:
	debug( 'Resolved a user configuration directory and provided a file basename. Will attempt to resolve a configuration file having the provided basename: `%s`. Beginning search...', opts.basename );
	return userDirFile( udir, opts.basename, opts.fmt );
} // end FUNCTION user()


// EXPORTS //

module.exports = user;
