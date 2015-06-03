function LFO (param) {
	this.startTime = new Date().getTime();
	
	this.freq = param.freq || 1;
	this.amplitude = param.amplitude || 1;
	this.waveform = param.waveform || Math.sin;
	
	this.set = function (param) {
		this.freq = param.freq || 1;
		this.amplitude = param.amplitude || 1;
		this.waveform = param.waveform || Math.sin;
	}
	
	this.value = function() {
		var T = 1 / this.freq;
		var d = new Date().getTime();
		var a = (d - this.startTime) / 1000;
		var x = this.freq * a;
		x = x - Math.floor(x);
		
		return this.amplitude * this.waveform(x * 2 * Math.PI);
	}
}

function insert (v) {
	for (var i = 0; i < values.length; i++) {
		if (i == values.length-1) {
			values[i] = v;
			break;
		}
		values[i] = values[i+1];
	}
}

var scene = document.getElementById('scene');
var ctx = scene.getContext('2d');
var values = [];

ctx.strokeStyle = "white";

for (var i = 0; i < scene.width; i++) {
	values[i] = 0;
}

function loop () {
	requestAnimationFrame(loop);

	ctx.clearRect(0, 0, scene.width, scene.height);
	ctx.beginPath();
	
	var v = lfo.value();
	insert(v);
	ctx.moveTo(0, -values[0] + 150);
	
	for (var i = 1; i < values.length; i++) {
		ctx.lineTo(i, -values[i]+150);
	}
	
	ctx.stroke();
	ctx.closePath();
}

var lfo = new LFO({
	freq: 0.2,
	amplitude: 100,
	waveform: function (x) {
		return x / (2 * Math.PI);  //Sawtooth
	}
});
loop();