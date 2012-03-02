var errors = document.getElementById('errors');

function assertEquals(one, two, name) {
	if (typeof one !== 'string') {
		one = one.toString();
	}

	if (typeof two !== 'string') {
		two = two.toString();
	}

	if (one !== two) {
		errors.innerHTML += (name || "unnamed") + ' fails: ' + JSON.stringify(one) + ' should equal ' + JSON.stringify(two);
	}
}


// colour.parse
assertEquals(colour.parse('#FF00aa'), '255,0,170');
assertEquals(colour.parse('#F0a'), '255,0,170');
assertEquals(colour.parse('rgb(100, 20, 45)'), '100,20,45');
assertEquals(colour.parse('RGB(100, 20, 45)'), '100,20,45');
assertEquals(colour.parse('rgb(100,20, 45)'), '100,20,45');
assertEquals(colour.parse('blue'), '0,0,255');
assertEquals(colour.parse('BLUE'), '0,0,255');
assertEquals(colour.parse('bLue'), '0,0,255');

// colour.aryToString
assertEquals(colour.aryToString([255,0,10]), 'rgb(255,0,10)');

// colour.add
assertEquals(colour.add('red', 'blue'), 'rgb(255,0,255)');
assertEquals(colour.add('red', 'blue', 'lime'), 'rgb(255,255,255)');
assertEquals(colour.add('red', 'red', 'red'), 'rgb(255,0,0)');

// colour.multiply
assertEquals(colour.multiply('#110022', 2), 'rgb(34,0,68)');
assertEquals(colour.multiply('red', 17), 'rgb(255,0,0)');

// colour.divide
assertEquals(colour.divide('red', 2), 'rgb(128,0,0)');
assertEquals(colour.divide('#333', 3), 'rgb(17,17,17)');

// colour.average
assertEquals(colour.average('red', 'blue'), 'rgb(64,0,128)');
assertEquals(colour.average('#030000', '#000300', '#000003'), 'rgb(1,1,1)');
assertEquals(colour.average('red', 'red'), 'rgb(255,0,0)');
