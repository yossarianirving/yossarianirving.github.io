---
title: "Anaglyph Demo"
date: 2024-04-18T15:49:40-04:00
draft: false
# menu:
#   main:
#     weight: 1
---

This is a demo of my anaglyph-rs library compiled to WebAssembly. Add the left and right images to their respective fields, adjust the x and y offsets and hit submit.
Make sure both images have the exact same dimensions before submitting. 


<form id="imageForm" enctype="multipart/form-data" class="center">
<div class="mb3">
    <label for="leftImage" class="f6 b db mb2">Upload Left Image:</label>
    <input type="file" class="input-reset ba b--black-20 pa2 mb2" id="leftImage" name="leftImage" accept="image/*" autocomplete="off">
</div>
<div class="mb3">
    <label for="rightImage" class="f6 b db mb2">Upload Right Image:</label>
    <input type="file" class="input-reset ba b--black-20 pa2 mb2" id="rightImage" name="rightImage" accept="image/*" autocomplete="off">
</div>
<div class="mb3">
    <label for="anaglyphType" class="f6 b db mb2">Anaglyph Type:</label>
    <select class="input-reset ba b--black-20 pa2 mb2" id="anaglyphType" name="anaglyphType">
    <option selected value="color">Color</option>
    <option value="half-color">Half-Color</option>
    <option value="grayscale">Grayscale</option>
    <option value="optimized">Optimized</option>
    <option value="true">True</option>
    </select>
</div>
<div class="mb3">
    <label for="xOffset" class="f6 b db mb2">Offset x:</label>
    <input type="number" class="input-reset ba b--black-20 pa2 mb2" id="xOffset" name="xOffset" value="0">
</div>
<div class="mb3">
    <label for="yOffset" class="f6 b db mb2">Offset y:</label>
    <input type="number" class="input-reset ba b--black-20 pa2 mb2" id="yOffset" name="yOffset" value="0">
</div>
<button type="submit" class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" id="submit" disabled>Submit</button>
</form>
<br>
<canvas id="result" class="db center measure-wide"></canvas>
<!-- Note the usage of `type=module` here as this is an ES6 module -->
<script type="module">
// Use ES module import syntax to import functionality from the module
// that we have compiled.
//
// Note that the `default` import is an initialization function which
// will "boot" the module and make it ready to use. Currently browsers
// don't support natively imported WebAssembly as an ES module, but
// eventually the manual initialization won't be required!
import init, { Anaglyph } from '/packages/anaglyph-wasm/anaglyph_wasm.js';
var anaglyph;
var leftLoaded = false;
var rightLoaded = false;
var start = 0;
var worker = new Worker('/packages/anaglyph-wasm/anaglyph-worker.js', { type: 'module' });
worker.onmessage = function(e) {
console.log(e.data)
switch (e.data.type) {
    case 'anaglyph-result':
    var result = e.data.image;
    var canvas = document.getElementById('result');
    canvas.height = result.height;
    canvas.width = result.width;
    canvas.style.width = "95%"
    var ctx = canvas.getContext('2d');
    ctx.drawImage(result, 0, 0, canvas.width, canvas.height);
    console.log("Time taken: " + (performance.now() - start) + "ms");
    break;
    case 'left-image-loaded':
    leftLoaded = true;
    console.log("Left image loaded");
    if (rightLoaded) {
        document.getElementById("submit").disabled = false;
    }
    break;
    case 'right-image-loaded':
    rightLoaded = true;
    console.log("Right image loaded");
    if (leftLoaded) {
        document.getElementById("submit").disabled = false;
    }
    break;
    case 'anaglyph-error':
    alert(e.data.error);
    break;
}
};
async function run() {
await init();
// And afterwards we can use all the functionality defined in wasm.
anaglyph = Anaglyph.new();
}
run();     
document.getElementById("imageForm").addEventListener('submit', function(event) {
event.preventDefault();
start = performance.now();
var anaglyphType = document.getElementById('anaglyphType').value;
var xOffset = parseInt(document.getElementById('xOffset').value);
var yOffset = parseInt(document.getElementById('yOffset').value);       
worker.postMessage({type: 'anaglyph-submit', offset: {x: xOffset, y: yOffset }, anaglyphType: anaglyphType });
})
document.getElementById('rightImage').addEventListener('change', function(e) {
worker.postMessage({type: 'uploadRightImage', image: e.target.files[0]});
console.log("Sent right image to worker");
});
document.getElementById('leftImage').addEventListener('change', function(e) {
worker.postMessage({type: 'uploadLeftImage', image: e.target.files[0]});
console.log("Sent left image to worker");
});
</script>
