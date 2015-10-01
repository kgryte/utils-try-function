Try Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Wraps a function in a try/catch block.


## Installation

``` bash
$ npm install utils-try-function
```


## Usage

``` javascript
var wrap = require( 'utils-try-function' );
```

#### wrap( fcn )

Wraps a `function` in a `try/catch` block.

``` javascript
function fcn() {
	throw new Error( 'beep boop' );
}

var f = wrap( fcn );

var out = f();
if ( out instanceof Error ) {
	console.error( out.message );
	// returns 'beep boop'
}
```

The returned `function` has the same signature as the wrapped `function`.

``` javascript
function fcn( a, b, c, d ) {
	var sum = a + b + c + d;
	if ( sum < 10 ) {
		throw new Error( 'invalid input arguments. Arguments must sum to a number greater than or equal to 10.' );
	}
	return sum;
}

var f = wrap( fcn );

var out = f( 5, 6, 7, 8 );
// returns 26

out = f( 1, 2, 3, 1 );
// returns <Error>
```

If provided an asynchronous `function`, the returned `function` only traps `errors` which occur during the current event loop tick.

``` javascript
function fcn( a, b, clbk ) {
	if ( !a ) {
		throw new Error( 'invalid input argument.' );
	}
	process.nextTick( onTick );
	function onTick() {
		if ( !b ) {
			throw new Error( 'invalid input argument.' );
		}
		clbk();
	}
}

function done() {
	console.log( 'beep' );
}

var f = wrap( fcn );

var out = f( null, 5, done );
// returns <Error>

out = f( true, null, done );
// returns undefined
```


## Notes

*	Isolating `try/catch` blocks as separate wrapped `functions` prevents a parent scope from permanently entering optimization hell.


## Examples

``` javascript
var isString = require( 'validate.io-string-primitive' ),
	wrap = require( 'utils-try-function' );

function beep( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return 'beep' + str;
}

function boop( str, clbk ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	setTimeout( done, 1000 );

	function done() {
		if ( str !== 'beep' ) {
			throw new Error( 'invalid input argument. String must equal `beep`. Value: `' + str + '`.' );
		}
		clbk( str + ' boop' );
	}
}

function done( str ) {
	if ( str !== 'beep boop' ) {
		throw new Error( 'huh?' );
	}
}

var out, f;

// Synchronous...
f = wrap( beep );

out = f( 'boop' );
// returns 'beep boop'

out = f( null );
// returns <Error>


// Asynchronous...
f = wrap( boop );

out = f( 'beep', done );
// returns undefined

out = f( 'foo', done );
// returns undefined and then throws
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


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


[npm-image]: http://img.shields.io/npm/v/utils-try-function.svg
[npm-url]: https://npmjs.org/package/utils-try-function

[travis-image]: http://img.shields.io/travis/kgryte/utils-try-function/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-try-function

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/utils-try-function/master.svg
[codecov-url]: https://codecov.io/github/kgryte/utils-try-function?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-try-function.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-try-function

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-try-function.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-try-function

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-try-function.svg
[github-issues-url]: https://github.com/kgryte/utils-try-function/issues
