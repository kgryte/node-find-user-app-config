'use strict';

// MODULES //

var debug = require( 'debug' )( 'find-user-app-config:userdirfile' ),
	extname = require( 'utils-extname' ),
	upsearch = require( 'utils-upsearch' ).sync,
	load = require( 'app-etc-load' ),
	check = require( './exists.js' ),
	pkgrc = require( './pkgrc.js' );


// STRATEGY //

/**
* CASE 1: file name with extension but no format.
*
*	=> Search for `<name>` and then `.<name>` in `<udir>`.
*	=> If found, parse according to `<ext>`.
*
*	=> Search for `.<name>` starting from the current working directory.
*	=> If found, parse according to `<ext>`.
*
*
* CASE 2: file name with no extension and no format
*	=> Search for `.<name>` and `.<name>rc` in `<udir>`.
*	=> If found, parse as `ini`.
*
*	=> Search for `<name>` in `<udir>`.
*	=> If found, parse according to `ini`.
*
*	=> Search for `<name>.<ext>` and `.<name>.<ext>` in `<udir>`.
*	=> If found, parse according to `<ext>`.
*
*	=> Search for `.<name>` and `.<name>rc` starting from the current working directory.
*	=> If found, parse as `ini`.
*
*
* CASE 3: file name with extension and a format.
*
*	=> Search for `<name>` and then `.<name>` in `<udir>`.
*	=> If found, parse according to `<ext>`.
*
*	=> Search for `.<name>` starting from the current working directory.
*	=> If found, parse according to `<ext>`.
*
*
* CASE 4: file name with no extension but provided a format.
*	=> Search for `.<name>` and `.<name>rc` in `<udir>`.
*	=> If found, parse according to `<format>`.
*
*	=> Search for `<name>` in `<udir>`.
*	=> If found, parse according to `<format>`.
*
*	=> Search for `<name>.<ext>` and `.<name>.<ext>` in `<udir>`.
*	=> If found, parse according to `<ext>`.
*
*	=> Search for `.<name>` and `.<name>rc` starting from the current working directory.
*	=> If found, parse according to `<format>`.
*/


// RESOLVE //

/**
* FUNCTION: resolve( udir, name, fmt )
*	Searches for a user configuration file having a specified basename.
*
* @param {String} udir - user configuration directory
* @param {String} name - basename
* @param {Void|String} fmt - configuration file format
* @returns {Object|Null} configuration object or null
*/
function resolve( udir, name, fmt ) {
	var fpath,
		base,
		ext;

	ext = extname( name );

	// Basename has an extension...
	if ( ext ) {
		base = name;
		fpath = check( udir, base, false );
		if ( fpath ) {
			debug( 'Found a user configuration file: %s. Attempting to load...', fpath );
			return load( fpath );
		} else {
			debug( 'Unable to resolve a user configuration file with basename `%s` in directory `%s`.', base, udir );
		}
		if ( name[ 0 ] !== '.' ) {
			base = '.' + name;
			fpath = check( udir, base, false );
			if ( fpath ) {
				debug( 'Found a user configuration file: %s. Attempting to load...', fpath );
				return load( fpath );
			} else {
				debug( 'Unable to resolve a user configuration file with basename `%s` in directory `%s`.', base, udir );
			}
		}
		// File basename should already begin with a '.'.
		fpath = upsearch( base );
		if ( fpath ) {
			debug( 'Found a user configuration file: %s. Attempting to load...', fpath );
			return load( fpath );
		} else {
			debug( 'Unable to resolve a user configuration file with basename `%s`.', base );
		}
		debug( 'Unable to resolve a user configuration file.' );
		return null;
	}
	// No extension...
	fmt = fmt || 'ini';

	// Search for a dot or rc file...
	if ( name[ 0 ] === '.' ) {
		base = name;
	} else {
		base = '.' + name;
	}
	fpath = check( udir, base, false );
	if ( fpath ) {
		debug( 'Found a user configuration file: %s. Attempting to load and parse as `%s`...', fpath, fmt );
		return load( fpath, fmt );
	} else {
		debug( 'Unable to resolve a user configuration file with basename `%s` in directory `%s`.', base, udir );
	}
	base += 'rc';
	fpath = check( udir, base, false );
	if ( fpath ) {
		debug( 'Found a user configuration file: %s. Attempting to load and parse as `%s`...', fpath, fmt );
		return load( fpath, fmt );
	} else {
		debug( 'Unable to resolve a user configuration file with basename `%s` in directory `%s`.', base, udir );
	}

	// Check for a file without an extension...
	base = name;
	fpath = check( udir, base, false );
	if ( fpath ) {
		debug( 'Found a user configuration file: %s. Attempting to load...', fpath );
		return load( fpath, fmt );
	} else {
		debug( 'Unable to resolve a user configuration file with basename `%s` in directory `%s`.', base, udir );
	}

	// Check for a file having a supported extension...
	base = name;
	fpath = check( udir, base, true );
	if ( fpath ) {
		debug( 'Found a user configuration file: %s. Attempting to load...', fpath );
		return load( fpath );
	} else {
		debug( 'Unable to resolve a user configuration file with basename `%s` and a supported extension name in directory `%s`.', base, udir );
	}
	if ( name[ 0 ] !== '.' ) {
		base = '.' + name;
		fpath = check( udir, base, true );
		if ( fpath ) {
			debug( 'Found a user configuration file: %s. Attempting to load...', fpath );
			return load( fpath );
		} else {
			debug( 'Unable to resolve a user configuration file with basename `%s` and a supported extension name in directory `%s`.', base, udir );
		}
	}

	// Walk up from the cwd in search of a dot or rc file...
	return pkgrc( name, fmt );
} // end FUNCTION resolve()


// EXPORTS //

module.exports = resolve;
