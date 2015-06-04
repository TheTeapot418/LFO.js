function LFO (param) {
	this.startTime = new Date().getTime();
	
	var param = param || {};
	
	this.freq = param.freq || 1;
	this.amplitude = param.amplitude || 1;
	
	switch (param.waveform) {
		case "sine":
			this.waveform = Math.sin;
			break;
			
		case "triangle":
			this.waveform = function(x) {
				if (x <= Math.PI) {
					return x / (Math.PI / 2) - 1;
				} else {
					return (x - (Math.PI)) / (-Math.PI / 2) + 1;
				}

			}
			break;
			
		case "square":
			this.waveform = function(x) {
				if (x <= Math.PI) {
					return -1;
				} else {
					return 1;
				}
			}
			break;
			
		case "sawtooth":
			this.waveform = function(x) {
				return x / (2 * Math.PI);
			}
			break;
			
		case "noise":
			this.waveform = function(x) {
				return Math.random() * 2 - 1;
			}
			break;
			
		default:
			this.waveform = param.waveform || Math.sin;
	}
	
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