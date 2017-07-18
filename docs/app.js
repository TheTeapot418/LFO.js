Math.map = function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

window.addEventListener('load', function() {
  var waveformForm = document.getElementById('waveform-form');

  var frequencyInput = document.getElementById('input-frequency');
  var frequencyReadout = document.getElementById('frequency-readout');

  var amplitudeInput = document.getElementById('input-amplitude');
  var amplitudeReadout = document.getElementById('amplitude-readout');

  var rangeInput = document.getElementById('input-range');
  var numberInput = document.getElementById('input-number');

  var canvas = document.getElementById('canvas-1');
  var context = canvas.getContext('2d');

  var canvas2 = document.createElement('canvas');
  var context2 = canvas2.getContext('2d');

  var canvasHeight = 200;
  var dpr = window.devicePixelRatio || 1;

  canvas.width = document.body.clientWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = document.body.clientWidth + 'px';
  canvas.style.height = canvasHeight + 'px';

  canvas2.width = document.body.clientWidth * dpr;
  canvas2.height = canvasHeight * dpr;

  var lineWidth = 2 * dpr;
  var lastValue = Math.map(0, 1, -1, lineWidth, canvas.height - lineWidth);

  window.addEventListener('resize', function() {
    dpr = window.devicePixelRatio || 1;

    canvas.width = document.body.clientWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = document.body.clientWidth + 'px';
    canvas.style.height = canvasHeight + 'px';

    canvas2.width = document.body.clientWidth * dpr;
    canvas2.height = canvasHeight * dpr;

    lineWidth = 2 * dpr;
  });

  var lfoCanvas = new LFO({
    waveform: 'sine',
    freq: 0.2
  });

  waveformForm.addEventListener('change', function(e) {
    lfoCanvas.set({ waveform: e.target.value });
  });

  frequencyInput.addEventListener('input', function(e) {
    lfoCanvas.set({ freq: this.value });
    frequencyReadout.textContent = this.value;
  });

  amplitudeInput.addEventListener('input', function(e) {
    lfoCanvas.set({ amplitude: this.value });
    amplitudeReadout.textContent = this.value;
  });

  function canvasDraw(lfoValue) {
    var ctx = context;
    var ctx2 = context2;
    var position = Math.map(lfoValue, 1, -1, lineWidth, canvas.height - lineWidth);

    ctx2.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.drawImage(canvas, 0, 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas2, -lineWidth, 0);

    ctx.beginPath();
    ctx.moveTo(
      canvas.width - (lineWidth * 2),
      lastValue
    );
    ctx.lineTo(
      canvas.width - lineWidth,
      position
    );
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'rgb(255,0,0)';
    ctx.lineCap = 'round';
    ctx.stroke();
    lastValue = position;
  }

  function setInputValues(lfoValue) {
    rangeInput.value = lfoValue;
    numberInput.value = lfoValue;
  }

  function loop() {
    requestAnimationFrame(loop);
    var lfoValue = lfoCanvas.value;
    canvasDraw(lfoValue);
    setInputValues(lfoValue);
  }

  requestAnimationFrame(loop);
});