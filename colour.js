/**
 * colour.js written by Callum Macrae.
 * Colour, not color!
 *
 */
var colour = {};

/**
 * Parses a colour (eg #fff or rgb(255,255,255)) and returns an array.
 *
 * @param string colour The colour to parse.
 * @returns array Array containing red, green and blue values.
 */
colour.parse = function (colour) {
	"use strict";
	var info;

	if (info = /rgb\(([0-9]{1,3}), ?([0-9]{1,3}), ?([0-9]{1,3})\)/i.exec(colour)) {
		return [
			parseInt(info[1], 10),
			parseInt(info[2], 10),
			parseInt(info[3], 10)
		];
	} else if (colour.slice(0, 1) === '#') {
		if (colour.length === 4) {
			return [
				parseInt(colour.slice(1, 2), 16) * 17,
				parseInt(colour.slice(2, 3), 16) * 17,
				parseInt(colour.slice(3, 4), 16) * 17
			];
		}
		return [
			parseInt(colour.slice(1, 3), 16),
			parseInt(colour.slice(3, 5), 16),
			parseInt(colour.slice(5, 7), 16)
		];
	}
};
