'use strict';

// MODULES //

var isFunction = require( 'validate.io-function' );


// WRAP //

/**
* FUNCTION: wrap( fcn[, thisArg] )
*	Wraps a function in a try/catch block.
*
* @param {Function} fcn - function to wrap
* @param {*} [thisArg] - function context
* @returns {Function} wrapped function
*/
function wrap( fcn, thisArg ) {
	var ctx;
	if ( !isFunction( fcn ) ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + fcn + '`.' );
	}
	if ( arguments.length > 1 ) {
		ctx = thisArg;
	} else {
		ctx = null;
	}
	/**
	* FUNCTION: wrapped()
	*	Wrapped function.
	*
	* @param {...*} [args] - function arguments
	* @returns {*|Error} returned value or an error object
	*/
	return function wrapped() {
		var args,
			len,
			i;

		len = arguments.length;
		args = new Array( len );
		for ( i = 0; i < len; i++ ) {
			args[ i ] = arguments[ i ];
		}
		try {
			return fcn.apply( ctx, args );
		} catch ( error ) {
			return error;
		}
	}; // end FUNCTION wrapped()
} // end FUNCTION wrap()


// EXPORTS //

module.exports = wrap;
