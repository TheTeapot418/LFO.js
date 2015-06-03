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