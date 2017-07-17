# LFO JS

A simple JavaScript library that implements LFOs in JavaScript.

## What is an LFO

LFO stands for Low Frequency Oscillator - a device which oscillates between two values on a certain frequency, following a given waveform.

*Note: In this library, there is no limitation concerning the frequency, as a result it can behave strangely at a high frequency*

## Usage

#### Instantiation

First of all, include LFO:

```JavaScript
import LFO from 'lfo';
```  
or  
```JavaScript
var LFO = require('lfo');
```

To import LFO in HTML, you can:  
```HTML
<script src='LFO.js'></script>
```  
and access using  
```JavaScript
window.LFO
```

To create an LFO, you just have to create a new instance of `LFO`:

```JavaScript
const myLfo = new LFO();
```

The `LFO` function takes an object as an argument, containing these parameters:

+ `freq`: the frequency of the oscillator
+ `amplitude`: the amplitude of the oscillator
+ `waveform`: string to use built in waveforms or a custom waveform function. This function takes a number between 0 and 2PI as an argument and must return a number between 0 and 1.

Example:

```JavaScript
const myLfo = new LFO ({
  freq: 1.3,
  amplitude: 2,
  waveform(x) {
    if (x <= Math.PI) {
      return -1;
    }
    return 1;
  }
  // Same as:
  // waveform: 'square'
});
```

This code will create a new LFO with a frequency of 1.3Hz, an amplitude of 2 and which will produce a square signal.

*Note: Every parameter is optional*

#### Waveform functions

There are a few basic waveform functions that are included in the library.  
Set `waveform` to one of these strings instead of a function to use it:

+ `sine` (default value)
+ `triangle`
+ `square`
+ `sawtooth`
+ `noise`

#### Getting the current value

To retrieve the current value of an LFO, just use the `value` parameter:

```JavaScript
const v = myLfo.value;
```

#### Changing parameters

To change parameters of an LFO, use the `set` function which takes the same argument as the constructor of the class:

```JavaScript
myLfo.set({
  freq: 0.7
});
```