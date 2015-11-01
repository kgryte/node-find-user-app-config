User Config
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Loads an application's user configuration.


## Installation

``` bash
$ npm install find-user-app-config
```


## Usage

``` javascript
var find = require( 'find-user-app-config' );
```

#### find( [options] )

Loads an application's user configuration.

``` javascript
var config = find();
```

The `function` accepts the following `options`:

*	__dir__: user configuration directory. The [default value](https://github.com/kgryte/utils-configdir) is determined according to the host OS.
*	__basename__: basename of a file within the user configuration directory which contains *user* application settings. The default value is the [application name](https://github.com/kgryte/resolve-app-pkginfo).
*	__fmt__: user configuration file format. The default value is either determined from a `basename` filename [extension](https://github.com/kgryte/utils-extname) or `ini`.

User configuration directory locations vary from platform to platform. By default, this module only supports [standard directory locations](https://github.com/kgryte/utils-configdir). To accommodate non-standard user configuration directories, e.g., `$HOME/.config/<app_name>` on Mac OS X, the module supports a `dir` option. 

``` javascript
var homedir = require( 'utils-homedir' ),
	path = require( 'path' );

var dir = path.join( homedir(), '.config', 'my-app-name' );

var config = find({
	'dir': dir
});
```

By default, this module assumes that a configuration file name matches the application name. To specify a different configuration file basename, set the `basename` option.

``` javascript
var config = find({
	'basename': '.config'
});
```

If a basename does __not__ include a file [extension](https://github.com/kgryte/utils-extname), this module attempts to either find a file having a supported extension or parse a file as [INI](https://github.com/kgryte/utils-ini-parse). If a basename includes an [extension](https://github.com/kgryte/utils-extname), the module __always__ parses the configuration according to the [extension](https://github.com/kgryte/node-app-etc-load).

``` javascript
// Always parsed as YAML...
var config = find({
	'basename': '.config.yaml'
});
```

Alternatively, to parse a configuration file not having an [extension](https://github.com/kgryte/utils-extname) according to a specified format, set the `fmt` option.

``` javascript
// Parse as YAML...
var config = find({
	'basename': '.configrc',
	'fmt': 'yaml'
});
```


===
#### find.parser( extname[, parser] )

Returns a parser for the specified extension.

``` javascript
var parser = find.parser( '.json' );
```

Including the `.` when specifying an extension is optional.

``` javascript
var parser = find.parser( 'json' );
```

To support additional file formats or to override a parser, provide a `parser` function for an associated extension.

``` javascript
var parser = require( 'my-special-fmt-parser' );

find.parser( '<my-ext>', parser );
```

Once a parser is set, `find` invocations will load and parse provided files accordingly. For more details, see [app-etc-load](https://github.com/kgryte/node-app-etc-load).


---
## Notes

*	If a file extension is omitted when specifying a file basename, this module will search for the first file having the basename and a supported extension. For supported extensions, see [app-etc-load](https://github.com/kgryte/node-app-etc-load).
*	If a file basename does __not__ begin with a `.`, this module will search for both hidden and non-hidden files. This also applies for inferred basenames; e.g., __<pkg_name>__. If `<pkg_name>` is `super-app`, this module will search for and load either an `.super-app.<ext>` or a `super-app.<ext>` file.
*	Depending on provided options and the existence of a user configuration [directory](https://github.com/kgryte/utils-configdir), various strategies are used to resolve user application configuration files; e.g., see [source](https://github.com/kgryte/node-find-user-app-config/blob/master/lib/userdirfile.js). The basic strategy is as follows:

	-	Search for a configuration dot or `rc` file in a user configuration [directory](https://github.com/kgryte/utils-configdir).
	-	Search for a either a hidden or non-hidden configuration file having a supported [extension](https://github.com/kgryte/node-app-etc-load) in a user configuration [directory](https://github.com/kgryte/utils-configdir).
	-	Search for a configuration dot or `rc` file by walking up from the [current working directory](https://github.com/kgryte/utils-cwd).

	If you encounter unexpected results, set the `DEBUG` environment variable to see the steps taken to resolve a configuration file.

	``` bash
	$ DEBUG=find-user-app-config:* node <path/to/your/app>
	```


---
## Examples

``` javascript
var path = require( 'path' ),
	cwd = require( 'utils-cwd' ),
	find = require( 'find-user-app-config' );

// Find a user application config...
var config = find({
	'dir': path.join( cwd(), 'examples', 'foo' ),
	'basename': 'beep',
	'fmt': 'toml'
});
console.dir( config );
/*
	{
		'server': {
			'port': 8080,
			'address': '127.0.0.1',
			'ssl': true,
			'key': '',
			'cert': ''
		},
		'logger': {
			'level': 'debug'
		}
	}
*/
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/find-user-app-config.svg
[npm-url]: https://npmjs.org/package/find-user-app-config

[travis-image]: http://img.shields.io/travis/kgryte/node-find-user-app-config/master.svg
[travis-url]: https://travis-ci.org/kgryte/node-find-user-app-config

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/node-find-user-app-config/master.svg
[codecov-url]: https://codecov.io/github/kgryte/node-find-user-app-config?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/node-find-user-app-config.svg
[dependencies-url]: https://david-dm.org/kgryte/node-find-user-app-config

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/node-find-user-app-config.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/node-find-user-app-config

[github-issues-image]: http://img.shields.io/github/issues/kgryte/node-find-user-app-config.svg
[github-issues-url]: https://github.com/kgryte/node-find-user-app-config/issues
