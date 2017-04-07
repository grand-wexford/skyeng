"use strict";

var coins = [25, 10, 5];

var value = 101;
var info = {};

//console.log(permutator(coins));

var ALL = makeAA( coins, value );
//var ALLSorted = permutator( ALL );

console.log( info );
//permutator(coins);

//change( coins, value );


// Внести в объект, какая монета сколько раз вмещается в кажду
var stop = false;
function makeAA( coins, n ) {
	coins.sort( sDecrease );

	var x1;
	var x2;
	var variants = [];

	coins.forEach( function ( c, i ) {
		info[i] = {
			'coin': c
		};
		x1 = n % c; // 1 остаток
		info[i]['ostatok'] = x1;
		if ( x1 ) {
			x2 = Math.floor( n / c ); // 4 целая часть
			info[i]['celoe'] = x2;
			for ( var i = 0; i < x2; i++ ) {
				variants.push( c );
			}

			console.log( 'continue' );
		} else {
			console.log( 'OK' );
		}
		console.log( x1 );
		console.log( x2 );
	} );
	return variants;


}

function change( coins, n ) {
	coins.sort( sDecrease );

	var x1;
	var x2;
	var x3;

	coins.forEach( function ( c, i ) {

		x1 = n % c;
		if ( x1 ) {
			x2 = Math.floor( n / c );

			x3 = ( c * x2 ) - ( c * 1 );

			console.log( 'continue' );
		} else {
			console.log( 'OK' );
		}
		console.log( x1 );
		console.log( x2 );
	} );



}


function sDecrease( i, ii ) { // По убыванию
	if ( i > ii )
		return -1;
	else if ( i < ii )
		return 1;
	else
		return 0;
}


function permutator( inputArr ) {
	var results = [];

	function permute( arr, memo ) {
		var cur, memo = memo || [];

		for ( var i = 0; i < arr.length; i++ ) {
			cur = arr.splice( i, 1 );
			if ( arr.length === 0 ) {
				results.push( memo.concat( cur ) );
			}
			permute( arr.slice(), memo.concat( cur ) );
			arr.splice( i, 0, cur[0] );
		}

		return results;
	}

	return permute( inputArr );
}