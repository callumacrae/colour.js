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

	info = /rgb\(([0-9]{1,3}), ?([0-9]{1,3}), ?([0-9]{1,3})\)/i.exec(colour);
	if (info) {
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
	} else if (this._colours[colour.toLowerCase()]) {
		return this._colours[colour.toLowerCase()].slice();
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
	"use strict";

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
 * 	Éetc
 * @returns string The new colour.
 */
colour.add = function () {
	"use strict";

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

/**
 * Multiplies a colour by a constant.
 *
 * @param string c The colour.
 * @param int i The constant.
 * @returns string The new colour.
 */
colour.multiply = function (c, i) {
	"use strict";

	c = colour.parse(c);

	if (typeof i !== 'number') {
		throw Error('Must be a number');
	}

	c.forEach(function (d, j) {
		c[j] = Math.round((d * i > 255) ? 255 : d * i);
	});

	return colour.aryToString(c);
};

/**
 * Divides a colour by a constant.
 *
 * @param string c The colour.
 * @param int i The constant.
 * @returns string The new colour.
 */
colour.divide = function (c, i) {
	"use strict";

	return colour.multiply(c, 1 / i);
};

/**
 * Returns the average of two or more numbers.
 *
 * @param string c1 The first colour.
 * @param string c2 The second colour.
 * 	Éetc
 * @returns string The new colour.
 */
colour.average = function () {
	"use strict";

	for (var i = 0; i < arguments.length; i++) {
		arguments[i] = colour.divide(arguments[i], arguments.length);
	}

	return colour.add.apply(null, arguments);
};

colour._colours = {
	aliceblue: [240, 248, 255],
	antiquewhite: [250, 235, 215],
	aqua: [0, 255, 255],
	aquamarine: [127, 255, 212],
	azure: [240, 255, 255],
	beige: [245, 245, 220],
	bisque: [255, 228, 196],
	black: [0, 0, 0],
	blanchedalmond: [255, 235, 205],
	blue: [0, 0, 255],
	blueviolet: [138, 43, 226],
	brown: [165, 42, 42],
	burlywood: [222, 184, 135],
	cadetblue: [95, 158, 160],
	chartreuse: [127, 255, 0],
	chocolate: [210, 105, 30],
	coral: [255, 127, 80],
	cornflowerblue: [100, 149, 237],
	cornsilk: [255, 248, 220],
	crimson: [220, 20, 60],
	cyan: [0, 255, 255],
	darkblue: [0, 0, 139],
	darkcyan: [0, 139, 139],
	darkgoldenrod: [184, 134, 11],
	darkgray: [169, 169, 169],
	darkgreen: [0, 100, 0],
	darkkhaki: [189, 183, 107],
	darkmagenta: [139, 0, 139],
	darkolivegreen: [85, 107, 47],
	darkorange: [255, 140, 0],
	darkorchid: [153, 50, 204],
	darkred: [139, 0, 0],
	darksalmon: [233, 150, 122],
	darkseagreen: [143, 188, 143],
	darkslateblue: [72, 61, 139],
	darkslategray: [47, 79, 79],
	darkturquoise: [0, 206, 209],
	darkviolet: [148, 0, 211],
	deeppink: [255, 20, 147],
	deepskyblue: [0, 191, 255],
	dimgray: [105, 105, 105],
	dodgerblue: [30, 144, 255],
	firebrick: [178, 34, 34],
	floralwhite: [255, 250, 240],
	forestgreen: [34, 139, 34],
	fuchsia: [255, 0, 255],
	gainsboro: [220, 220, 220],
	ghostwhite: [248, 248, 255],
	gold: [255, 215, 0],
	goldenrod: [218, 165, 32],
	gray: [128, 128, 128],
	green: [0, 128, 0],
	greenyellow: [173, 255, 47],
	honeydew: [240, 255, 240],
	hotpink: [255, 105, 180],
	indianred: [205, 92, 92],
	indigo: [75, 0, 130],
	ivory: [255, 255, 240],
	khaki: [240, 230, 140],
	lavender: [230, 230, 250],
	lavenderblush: [255, 240, 245],
	lawngreen: [124, 252, 0],
	lemonchiffon: [255, 250, 205],
	lightblue: [173, 216, 230],
	lightcoral: [240, 128, 128],
	lightcyan: [224, 255, 255],
	lightgoldenrodyellow: [250, 250, 210],
	lightgrey: [211, 211, 211],
	lightgreen: [144, 238, 144],
	lightpink: [255, 182, 193],
	lightsalmon: [255, 160, 122],
	lightseagreen: [32, 178, 170],
	lightskyblue: [135, 206, 250],
	lightslategray: [119, 136, 153],
	lightsteelblue: [176, 196, 222],
	lightyellow: [255, 255, 224],
	lime: [0, 255, 0],
	limegreen: [50, 205, 50],
	linen: [250, 240, 230],
	magenta: [255, 0, 255],
	maroon: [128, 0, 0],
	mediumaquamarine: [102, 205, 170],
	mediumblue: [0, 0, 205],
	mediumorchid: [186, 85, 211],
	mediumpurple: [147, 112, 216],
	mediumseagreen: [60, 179, 113],
	mediumslateblue: [123, 104, 238],
	mediumspringgreen: [0, 250, 154],
	mediumturquoise: [72, 209, 204],
	mediumvioletred: [199, 21, 133],
	midnightblue: [25, 25, 112],
	mintcream: [245, 255, 250],
	mistyrose: [255, 228, 225],
	moccasin: [255, 228, 181],
	navajowhite: [255, 222, 173],
	navy: [0, 0, 128],
	oldlace: [253, 245, 230],
	olive: [128, 128, 0],
	olivedrab: [107, 142, 35],
	orange: [255, 165, 0],
	orangered: [255, 69, 0],
	orchid: [218, 112, 214],
	palegoldenrod: [238, 232, 170],
	palegreen: [152, 251, 152],
	paleturquoise: [175, 238, 238],
	palevioletred: [216, 112, 147],
	papayawhip: [255, 239, 213],
	peachpuff: [255, 218, 185],
	peru: [205, 133, 63],
	pink: [255, 192, 203],
	plum: [221, 160, 221],
	powderblue: [176, 224, 230],
	purple: [128, 0, 128],
	red: [255, 0, 0],
	rosybrown: [188, 143, 143],
	royalblue: [65, 105, 225],
	saddlebrown: [139, 69, 19],
	salmon: [250, 128, 114],
	sandybrown: [244, 164, 96],
	seagreen: [46, 139, 87],
	seashell: [255, 245, 238],
	sienna: [160, 82, 45],
	silver: [192, 192, 192],
	skyblue: [135, 206, 235],
	slateblue: [106, 90, 205],
	slategray: [112, 128, 144],
	snow: [255, 250, 250],
	springgreen: [0, 255, 127],
	steelblue: [70, 130, 180],
	tan: [210, 180, 140],
	teal: [0, 128, 128],
	thistle: [216, 191, 216],
	tomato: [255, 99, 71],
	turquoise: [64, 224, 208],
	violet: [238, 130, 238],
	wheat: [245, 222, 179],
	white: [255, 255, 255],
	whitesmoke: [245, 245, 245],
	yellow: [255, 255, 0],
	yellowgreen: [154, 205, 50]
};
