/**
 * colour.js written by Callum Macrae.
 * Colour, not color!
 *
 */
var colour = {};

/**
 * Parses a colour (eg #fff or rgb(255,255,255)) and returns an array.
 *
 * Mostly for internal use.
 *
 * @param string colour The colour to parse.
 * @returns array Array containing red, green and blue values.
 */
colour.parse = function (colour) {
	"use strict";
	var info;

	if (typeof colour !== 'string') {
		throw Error('Colour must be a string.');
	}

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
	} else {
		throw Error('Colour not recognised.');
	}
};

/**
 * Takes an RGB array (returned by colour.parse), and returns a string.
 *
 * Mostly for internal use.
 *
 * @param array c The colour array.
 * @returns string The colour string.
 */
colour.aryToString = function (c) {
	if (!Array.isArray(c)) {
		throw Error('Colour must be an array.');
	}

	c = 'rgb(' + c.join(',') + ')';

	// Pass it to colour.parse to see whether it has produced a valid colour.
	try {
		colour.parse(c)
	} catch (err) {
		throw Error('Invalid array.');
	}

	return c;
};

/**
 * Adds two or more colours together.
 *
 * @param string c1 The first colour.
 * @param string c2 The second colour.
 * 	�etc
 * @returns string The new colour.
 */
colour.add = function () {
	var endColour = [0, 0, 0], i, tmpColour;
	for (i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] !== 'string') {
			throw Error('Colours must be strings.');
		}

		tmpColour = colour.parse(arguments[i]);
		endColour[0] += tmpColour[0];
		endColour[1] += tmpColour[1];
		endColour[2] += tmpColour[2];
	}

	endColour.forEach(function (c, i) {
		if (c > 255) {
			endColour[i] = 255;
		}
	});

	return colour.aryToString(endColour);
};