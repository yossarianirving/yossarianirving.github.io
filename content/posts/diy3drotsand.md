---
title: "Make Your Rotating Sandwich 3-D!"
date: 2025-11-21T20:25:04-05:00
draft: false
---

I've slightly modified my anaglyph demo to accept GIFs of rotating sandwiches and turn them 3-D.
Note that the video direction is the direction that the camera is going, not the rotation of the sandwich.
If the sandwich is rotating clockwise, set the direction to counter-clockwise and if it is rotating counter-clockwise, set the direction to clockwise.
[Rotating Sandwiches](https://rotatingsandwiches.com) is my preferred source of rotating sandwiches, but you can use your own source. Download a rotating sandwich
from that website, upload it to this form, set the correct direction, pick your preferred color, and submit.
Processing can take some time so be patient.

**Red/Cyan 3-D glasses are required for the effect to work**

<main class="container">
    <form id="gifForm" enctype="multipart/form-data" class="center">
        <div class="mb3">
            <label for="gifFile" class="f6 b db mb2">Upload GIF:</label>
            <input
                type="file"
                class="input-reset ba b--black-20 pa2 mb2"
                id="gifFile"
                name="gifFile"
                accept="image/gif"
                autocomplete="off"
            />
        </div>
        <div class="mb3">
            <label for="videoDirection" class="f6 b db mb2">Video Direction:</label>
            <select class="input-reset ba b--black-20 pa2 mb2" id="videoDirection">
                <option value="clockwise">Clockwise</option>
                <option value="counter-clockwise">Counter-Clockwise</option>
            </select>
        </div>
        <div class="mb3">
            <label for="anaglyphType" class="f6 b db mb2">Anaglyph Color Type:</label>
            <select class="input-reset ba b--black-20 pa2 mb2" id="anaglyphType">
                <option value="color">Color</option>
                <option value="half-color">Half-Color</option>
                <option value="grayscale">Grayscale</option>
                <option value="optimized">Optimized</option>
                <option value="true">True</option>
            </select>
        </div>
        <button
            type="submit"
            class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            id="submit"
            disabled
        >
            Submit
        </button>
    </form>
    <img id="resultGif" style="display: none; max-width: 95%" />
</main>
<script type="module">
    import init, { Anaglyph } from '/packages/anaglyph-wasm/anaglyph_wasm.js';
    var anaglyph;
    var worker = new Worker("/packages/anaglyph-wasm/anaglyph-worker.js", { type: "module" });
    worker.onmessage = function (e) {
        switch (e.data.type) {
            case "anaglyph-result-gif":
                var url = e.data.url;
                var resultGif = document.getElementById("resultGif");
                resultGif.src = url;
                resultGif.style.display = "block";
                document.getElementById("submit").disabled = false;
                document.getElementById("submit").innerText = "Submit"
                break;
            case "gif-loaded":
                document.getElementById("submit").disabled = false;
                document.getElementById("submit").innerText = "Submit"
                break;
            case "ready":
                document.getElementById("submit").disabled = false;
                break;
        }
    };
    async function run() {
        document.getElementById("submit").disabled = true;
        await init();
        anaglyph = Anaglyph.new();
    }
    run();
    document
        .getElementById("gifFile")
        .addEventListener("change", function (e) {
            document.getElementById("submit").disabled = true;
            document.getElementById("submit").innerText = "Loading..."
            worker.postMessage({
                type: "uploadGif",
                gif: e.target.files[0],
            });
        });
    document
        .getElementById("gifForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            document.getElementById("submit").disabled = true;
            document.getElementById("submit").innerText = "Processing..."
            var videoDirection =
                document.getElementById("videoDirection").value;
            var anaglyphType =
                document.getElementById("anaglyphType").value;
            worker.postMessage({
                type: "anaglyph-submit-gif",
                videoDirection: videoDirection,
                anaglyphType: anaglyphType,
            });
        });
</script>
