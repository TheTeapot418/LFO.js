#LFO JS

This project is a little and simple JavaScript library that will implement LFOs in JavaScript.

##What is an LFO

LFO stands for Low Frequency Oscillator. It's basically just a device which oscillates between two values on a certain frequency and following a given waveform.

*Note: In this library, there is no limitation concerning the frequency, but it can behave strangely at a high frequency*

##How to use it


####Instantiation

First of all, include the LFO script before your other scripts.

```html
<script src="LFO.js"></script>
```

To create an LFO, you just have to create a new instace of `LFO` :

```javascript
var my_lfo = new LFO ({});
```

The `LFO` function take an object as argument, containing these parameters :
 - `freq` : the frequency of the oscillator
 - `amplitude` : the amplitude of the oscillator
 - `waveform` : the custom waveform function. This function take a number between 0 and 2PI as argument and must return a number between 0 and 1.

Example :

```javascript
var my_lfo = new LFO ({
	freq: 1.3,
	amplitude: 2,
	waveform: function (x) {
		if (x < Math.PI) {
			return 1;
		} else {
			return -1;
		}
	}
});
```

This code will create a new LFO with a frequency of 1.3Hz, an amplitude of 2 and which will produce a square signal.

*Note: Every parameter is optional*

####Getting the current value

To retrieve the current value of an LFO, just use the `value` function :

```javascript
var v = my_lfo.value();
```
####Changing parameters

To change parameters of an LFO, use the `set` function which takes the same argument as the constructor of the class :

```javascript
my_lfo.set({
	freq: 0.7
});
```

##TODO

- Clean up the code
- Throw the LFO class in a separate file
- Make an ES6 module (that's going to be fun)
- Document