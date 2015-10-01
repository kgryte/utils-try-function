/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	wrap = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-try-function', function tests() {

	it( 'should export a function', function test() {
		expect( wrap ).to.be.a( 'function' );
	});

});
