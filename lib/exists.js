'use strict';

// MODULES //

var resolve = require( 'path' ).resolve,
	extensions = require( 'app-etc-load' ).exts,
	exists = require( 'utils-fs-exists' ).sync;


// CHECK //

/**
* FUNCTION: check( dir, basename, flg )
*	Checks the existence of a file path.
*
* @param {String} dir - configuration directory
* @param {String} basename - file basename
* @param {Boolean} flg - boolean indicating whether to scan for a file having the provided basename and a supported extension
* @returns {String|Null} resolve file path or null
*/
function check( dir, basename, flg ) {
	var fpath,
		exts,
		len,
		i;

	if ( flg ) {
		exts = extensions();
		len = exts.length;
		for ( i = 0; i < len; i++ ) {
			fpath = basename + exts[ i ];
			fpath = resolve( dir, fpath );
			if ( exists( fpath ) ) {
				return fpath;
			}
		}
	} else {
		fpath = resolve( dir, basename );
		if ( exists( fpath ) ) {
			return fpath;
		}
	}
	return null;
} // end FUNCTION check()


// EXPORTS //

module.exports = check;
