"use strict";

var coins = [5, 10, 50];
var value = 19950;

console.log(noChange(coins, value));

function noChange(coins, value) {
	coins.sort(sDecrease);

	return coins.some(function (coin) {
		if (value % coin === 0) {
			return true;
		} else {
			value %= coin;
		}
	});
}

function sDecrease(i, ii) {
	if (i > ii) {
		return -1;
	} else if (i < ii) {
		return 1;
	} else {
		return 0;
	}
}
