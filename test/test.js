/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	noop = require( '@kgryte/noop' ),
	wrap = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-try-function', function tests() {

	it( 'should export a function', function test() {
		expect( wrap ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a function', function test() {
		var values,
			i;

		values = [
			'5',
			5,
			null,
			NaN,
			undefined,
			[],
			{}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				wrap( value );
			};
		}
	});

	it( 'should return a function', function test() {
		expect( wrap( noop ) ).to.be.a( 'function' );
	});

	it( 'should return a function having the same signature', function test() {
		function add( a, b, c ) {
			return a + b + c;
		}

		var f = wrap( add );
		assert.strictEqual( add( 1, 2, 3 ), f( 1, 2, 3 ) );
	});

	it( 'should return a trapped error', function test() {
		function fcn() {
			throw new Error( 'beep boop' );
		}
		var f = wrap( fcn ),
			out = f();

		assert.isTrue( out instanceof Error );
		assert.strictEqual( out.message, 'beep boop' );
	});

	it( 'should allow setting the `this` context', function test() {
		function fcn() {
			/* jshint validthis: true */
			return this.beep;
		}
		var f = wrap( fcn, { 'beep': 'boop' } );
		assert.strictEqual( f(), 'boop' );
	});

	it( 'should not trap and return errors which occur in nested asynchronous function scopes', function test( done ) {
		function fcn() {
			process.nextTick( clbk );
		}
		function clbk() {
			expect( createError ).to.throw( Error );
			done();
		}
		function createError() {
			throw new Error( 'beep boop' );
		}
		var f = wrap( fcn );
		assert.isUndefined( f() );
	});

});
