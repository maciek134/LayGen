var Generator = {
	BG_TYPE_SOLID: 0,
	BG_TYPE_GRADIENT: 1
}, out, counter, actual = 0;

var updateCounter = function () {
	counter.innerHTML = '[';
	var i = out.children.length;
	while (i--) {
		if (i == out.children.length - actual - 1) {
			counter.innerHTML += '#';
		} else {
			counter.innerHTML += '<a href="javascript:changeTo(' + (out.children.length - i - 1) + ')">=</a>';
		}
	}
	counter.innerHTML += ']';
}

var changeTo = function (n) {
	out.children[actual].style.display = 'none';
	actual = n;
	out.children[actual].style.display = 'block';
	updateCounter();
}
var prev = function () {
	if (actual <= 0) return;
	changeTo(actual - 1);
}
var next = function () {
	if (actual >= out.children.length - 1) return;
	changeTo(actual + 1);
}

window.addEventListener('DOMContentLoaded', function () {
	var buttons = document.getElementsByTagName('button');
		out = document.getElementsByTagName('output')[0];
		counter = document.getElementById('counter');
	
	buttons[0].addEventListener('click', function () {
		var panel = document.createElement('div'),
			bgType = Math.floor(Math.random() * 2);
		if (bgType == Generator.BG_TYPE_SOLID) {
			panel.style.background = '#' + (Math.floor(Math.random() * 0xFFFFFF)).toString(16);
		} else {
			var gStops = Math.floor(Math.random() * 5), grad = '-webkit-gradient(linear, left top, left bottom, ';
			grad += 'color-stop(0, #' + (Math.floor(Math.random() * 0xFFFFFF)).toString(16) + '), ';
			var i = gStops;
			while (i--) {
				grad += 'color-stop(' + (1 / gStops) * (gStops - i) + ', #' + (Math.floor(Math.random() * 0xFFFFFF)).toString(16) + '), ';
			}
			grad += 'color-stop(1, #' + (Math.floor(Math.random() * 0xFFFFFF)).toString(16) + '))';
			panel.style.background = grad;
		}
		panel.style.borderRadius = Math.floor(Math.random() * 15) + 'px';
		panel.style.border = (Math.floor(Math.random() * 3) + 1) + 'px solid #' + (Math.floor(Math.random() * 0xFFFFFF)).toString(16);
		if (out.children[actual]) out.children[actual].style.display = 'none';
		out.appendChild(panel);
		actual = out.children.length - 1;
		updateCounter();
	});
	
	buttons[buttons.length - 1].addEventListener('click', function () {
		out.innerHTML = '';
		updateCounter();
	});
});