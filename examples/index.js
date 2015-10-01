'use strict';

var isString = require( 'validate.io-string-primitive' ),
	wrap = require( './../lib' );

function beep( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return 'beep ' + str;
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
console.log( out );
// returns 'beep boop'

out = f( null );
console.log( out.message );
// returns '<error message>'


// Asynchronous...
f = wrap( boop );

out = f( 'beep', done );
console.log( out );
// returns undefined

out = f( 'foo', done );
console.log( out );
// returns undefined and then throws
