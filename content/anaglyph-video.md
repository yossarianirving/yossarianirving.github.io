---
title: "Anaglyph Video"
date: 2026-11-11T20:26:41-05:00
draft: false
body_classes: "avenir bg-near-white anaglyph-tool"
menu:
  main:
    weight: 1
---

<div id="videoTool" class="tool-card">

<style>
/* The video converter is self-contained; the "anaglyph-tool" body class set
   in front matter (Ananke renders params.body_classes on <body>) lets this
   block neutralise the blog-post chrome for this page only, and it re-skins
   the tool with Ananke's own palette (#357edd / #00449e / #96ccff) and
   Tachyons spacing scale — no external stylesheet. Every rule is scoped to
   body.anaglyph-tool or #videoTool, so nothing leaks onto the rest of the
   site; the element ids are load-bearing (the script below drives them). */

/* --- page chrome --- */
body.anaglyph-tool .serif{font-family:inherit}
body.anaglyph-tool .w-two-thirds-l{width:100%}
body.anaglyph-tool .w-two-thirds-l.pr4-l{padding-right:0}
body.anaglyph-tool .w-30-l{display:none}
body.anaglyph-tool time{display:none}
body.anaglyph-tool #sharing{display:none}
#videoTool{font-family:"avenir next",avenir,sans-serif;color:#333}

/* --- tool card --- */
#videoTool.tool-card{background:#fff;border:1px solid #e3e3e3;border-radius:4px;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,.08);margin:0 0 1rem}
@media (min-width:30em){#videoTool.tool-card{padding:2rem}}

/* --- intro / kicker --- */
#videoTool .kicker{margin:0 0 .75rem}
#videoTool .badge{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:.2rem .6rem;border-radius:999px;background:#357edd;color:#fff;line-height:1.1}
#videoTool .intro{margin:0 0 1rem;color:#666;font-size:1rem;line-height:1.5}

/* --- fields --- */
#videoTool .field{margin-bottom:1rem}
#videoTool .field-row{display:flex;flex-wrap:wrap;gap:0 1.25rem}
#videoTool .field-row>.field{flex:1 1 13rem}
#videoTool .field-label{display:block;font-size:.8rem;font-weight:700;letter-spacing:.02em;color:#555;margin-bottom:.35rem}
#videoTool .hint{margin-top:.4rem;font-size:.78rem;line-height:1.45;color:#777}
#videoTool .control{display:block;width:100%;box-sizing:border-box;font-family:inherit;font-size:1rem;color:#333;background:#fff;border:1px solid #ccc;border-radius:4px;padding:.5rem .625rem;transition:border-color .15s ease,box-shadow .15s ease}
#videoTool .control:focus{outline:none;border-color:#357edd;box-shadow:0 0 0 3px rgba(53,126,221,.25)}
#videoTool select.control{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding-right:2rem;cursor:pointer;background-repeat:no-repeat;background-position:right .6rem center;background-size:1rem;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")}

/* --- native file input (button is themed, native filename text kept) --- */
#videoTool input[type=file].control{padding:.4rem;cursor:pointer}
#videoTool input[type=file]::-webkit-file-upload-button{font:inherit;font-weight:600;color:#fff;background:#357edd;border:0;border-radius:3px;padding:.45rem .85rem;margin-right:.75rem;cursor:pointer;transition:background .15s ease}
#videoTool input[type=file]::-webkit-file-upload-button:hover{background:#00449e}
#videoTool input[type=file]::file-selector-button{font:inherit;font-weight:600;color:#fff;background:#357edd;border:0;border-radius:3px;padding:.45rem .85rem;margin-right:.75rem;cursor:pointer;transition:background .15s ease}
#videoTool input[type=file]::file-selector-button:hover{background:#00449e}

/* --- buttons --- */
#videoTool .btn{display:inline-block;font-family:inherit;font-size:1rem;font-weight:600;line-height:1.2;padding:.55rem 1.1rem;border-radius:4px;border:1px solid transparent;cursor:pointer;text-decoration:none;transition:background .15s ease,color .15s ease,border-color .15s ease}
#videoTool .btn-primary{background:#357edd;color:#fff}
#videoTool .btn-primary:hover{background:#00449e;color:#fff}
#videoTool .btn-primary:disabled{background:#c9d6e5;color:#f2f5f9;cursor:not-allowed}
#videoTool .btn-danger{background:#fff;color:#e7040f;border-color:#e7040f}
#videoTool .btn-danger:hover{background:#e7040f;color:#fff}
#videoTool .btn-save{background:#137752;color:#fff}
#videoTool .btn-save:hover{background:#0c5c40;color:#fff}
#videoTool .btn-ghost{background:#fff;color:#555;border-color:#ccc;font-size:.85rem;padding:.4rem .8rem}
#videoTool .btn-ghost:hover{background:#f4f4f4;color:#111;border-color:#bbb}
#videoTool button.link-btn{background:none;border:0;padding:0;font-family:inherit;font-size:.85rem;color:#357edd;cursor:pointer;text-decoration:underline}
#videoTool button.link-btn:hover{color:#96ccff}

/* --- checkboxes --- */
#videoTool .checks{display:flex;flex-wrap:wrap;gap:.55rem 1.5rem}
#videoTool .check{display:inline-flex;align-items:center;font-size:.9rem;color:#444;cursor:pointer}
#videoTool .check input{width:1.05rem;height:1.05rem;margin:0 .45rem 0 0;accent-color:#357edd;cursor:pointer}

/* --- capability banner (JS reassigns className to "alert py-2 alert-*") --- */
#videoTool .alert{padding:.6rem .85rem;border-radius:4px;border:1px solid #ccc;background:#f4f4f4;color:#555;font-size:.85rem;line-height:1.45}
#videoTool .alert-secondary{background:#f4f4f4;border-color:#ddd;color:#555}
#videoTool .alert-warning{background:#fffceb;border-color:#f0c000;color:#6b5a00}

/* --- progress --- */
#videoTool .progress{height:1.1rem;background:#eee;border:1px solid #ddd;border-radius:999px;overflow:hidden}
#videoTool #progressBar{height:100%;background:#357edd;transition:width .25s ease}
#videoTool #status{display:inline-block;margin-top:.5rem;font-size:.85rem;color:#666}

/* --- result --- */
#videoTool .result-video{display:block;width:100%;max-width:44rem;border-radius:4px;background:#000;margin-bottom:1rem}
#videoTool #report{border-collapse:collapse;font-size:.85rem;max-width:34rem;width:100%}
#videoTool #report td{padding:.4rem .6rem;border-bottom:1px solid #eee;text-align:left;color:#444}
#videoTool #report tr:nth-child(odd){background:#fafafa}
#videoTool #report tr td:first-child{font-weight:600;color:#333;text-transform:capitalize}
</style>

<p class="intro">
    Upload an appropriate video clip and turn it into an anaglyph 3-D video.
    There are 5 color options for Red/Cyan glasses though the default <i>Color</i> is fine for most.
    The two auto direction options are there depending on how tight the shot is (assuming you are using a 360 video booth).
    Otherwise, you can manually set the direction based on the movement of the camera. Under advanced options there are
    the two pipelines which should be set to a reasonable default, but switching may result in a much faster or much slower render.
    I wouldn't recommend touching the checkboxes, those are mostly for my testing.
</p>

<div id="caps" class="alert alert-secondary mb3">
    Checking browser capabilities&hellip;
</div>

<form id="videoForm">
    <div class="field">
        <label class="field-label" for="videoFile">Upload video:</label>
        <input type="file" class="control" id="videoFile" accept="video/*" />
        <button type="button" class="link-btn" id="useSample">or use the bundled sample clip</button>
    </div>
    <div class="field-row">
        <div class="field">
            <label class="field-label" for="videoDirection">Video Direction:</label>
            <select class="control" id="videoDirection">
                <option value="auto-reverse" selected>Auto (close shot)</option>
                <option value="auto">Auto (wide shot)</option>
                <option value="clockwise">Clockwise</option>
                <option value="counter-clockwise">Counter-Clockwise</option>
            </select>
        </div>
        <div class="field">
            <label class="field-label" for="anaglyphType">Anaglyph Color Type:</label>
            <select class="control" id="anaglyphType">
                <option value="color">Color</option>
                <option value="half-color">Half-Color</option>
                <option value="grayscale">Grayscale</option>
                <option value="optimized">Optimized</option>
                <option value="true">True</option>
            </select>
        </div>
    </div>
    <button
        type="button"
        class="btn btn-ghost mb3"
        id="advancedToggle"
        aria-expanded="false"
        aria-controls="advancedOptions"
    >
        Advanced options &rsaquo;
    </button>
    <div id="advancedOptions" style="display: none">
        <div class="field">
            <label class="field-label" for="engine">Pipeline:</label>
            <select class="control" id="engine">
                <option value="webgpu">WebGPU (all-GPU, no wasm)</option>
                <option value="wasm" selected>WASM (WebCodecs + SIMD blend)</option>
            </select>
            <div class="hint" id="engineNote"></div>
        </div>
        <div class="field">
            <span class="field-label">Acceleration:</span>
            <div class="checks">
                <label class="check" for="hwDecode">
                    <input type="checkbox" id="hwDecode" checked /> Hardware decoding
                </label>
                <label class="check" for="hwEncode">
                    <input type="checkbox" id="hwEncode" checked /> Hardware encoding
                </label>
                <label class="check" for="webgpuBlend" id="webgpuBlendWrap">
                    <input type="checkbox" id="webgpuBlend" /> WebGPU blending (wasm pipeline, experimental)
                </label>
                <label class="check" for="canvasCapture" id="canvasCaptureWrap">
                    <input type="checkbox" id="canvasCapture" /> Canvas capture (zero-copy encode; usually slower)
                </label>
            </div>
            <div class="hint">
                Uncheck a box to force the software path if the hardware one
                looks broken (wrong colors, stalls). WebGPU blending (wasm
                pipeline) is off by default: frames must cross CPU memory for
                decode and encode anyway, so the GPU blend round-trip usually
                makes things slower. Canvas capture (WebGPU pipeline) keeps the
                encoder input zero-copy but measures slower on desktop.
            </div>
        </div>
        <div class="field">
            <label class="field-label" for="encoderQuality">Encode quality:</label>
            <select class="control" id="encoderQuality" style="max-width: 14rem">
                <option value="standard">Standard</option>
                <option value="high" selected>High</option>
                <option value="maximum">Maximum</option>
            </select>
            <div class="hint">
                Raises the encoder target bitrate (~2× for High, ~5× for
                Maximum). Helps when the source is already compressed and
                blocky — re-encoding at Standard compounds the artifacts.
                Output files grow accordingly.
            </div>
        </div>
    </div>
    <div class="mt3">
        <button type="submit" class="btn btn-primary" id="submit" disabled>Convert</button>
        <button type="button" class="btn btn-danger" id="cancel" style="display: none">Cancel</button>
    </div>
</form>

<div class="mt3" id="progressWrap" style="display: none">
    <div class="progress" role="progressbar" aria-label="Conversion progress">
        <div id="progressBar" style="width: 0%"></div>
    </div>
    <span id="status" aria-live="polite"></span>
</div>

<div id="result" class="mt4" style="display: none">
    <video id="resultVideo" controls class="result-video"></video>
    <p class="mb3">
        <a id="download" class="btn btn-save" download="anaglyph.mp4">Save</a>
    </p>
</div>



<script type="module">
    /**
     * One page, both pipelines — a thin UI over the package entry:
     * index.js owns the engine selection, the worker lifecycle
     * (ready-handshake queue, cancel watchdog) and the WebGPU→wasm
     * fallback; this page only wires controls, progress and results.
     * Assets (index.js, workers/, pkg/, gpu-video/, vendor/, bench/)
     * live in static/anaglyph-video/ so this page's relative imports
     * resolve next to its own URL.
     */
    import { checkSupport, createVideoConverter } from "./index.js";

    var engine = "wasm"; // engine the next run will use
    var pickedFile = null;
    var objectUrl = null;
    var resultFile = null; // File copy of the result for the Web Share API

    var submit = document.getElementById("submit");
    var cancel = document.getElementById("cancel");
    var progressWrap = document.getElementById("progressWrap");
    var progressBar = document.getElementById("progressBar");
    var statusEl = document.getElementById("status");
    var engineSelect = document.getElementById("engine");

    // --- advanced-options disclosure (no bootstrap JS on this page) ---

    var advancedToggle = document.getElementById("advancedToggle");
    var advancedOptions = document.getElementById("advancedOptions");
    advancedToggle.addEventListener("click", function () {
        var open = advancedOptions.style.display === "none";
        advancedOptions.style.display = open ? "block" : "none";
        advancedToggle.setAttribute("aria-expanded", String(open));
        advancedToggle.innerHTML = open
            ? "Advanced options &or;"
            : "Advanced options &rsaquo;";
    });

    // Engine-specific checkboxes: wasm-only WebGPU blend, GPU-only
    // canvas capture.
    function syncEngineControls() {
        document.getElementById("webgpuBlendWrap").style.display =
            engine === "wasm" ? "" : "none";
        document.getElementById("canvasCaptureWrap").style.display =
            engine === "webgpu" ? "" : "none";
    }

    engineSelect.addEventListener("change", function () {
        engine = engineSelect.value;
        syncEngineControls();
    });

    // --- conversion (worker lifecycle lives in index.js) ---

    var converter = createVideoConverter({
        onEngine: function (which, note) {
            if (note && note.fallback) {
                // The webgpu run died for adapter reasons and
                // index.js is retrying on wasm — flip the control
                // to match.
                engine = which;
                engineSelect.value = which;
                syncEngineControls();
                setStatus(
                    "WebGPU run failed (" +
                        note.fallback +
                        ") — retrying on the wasm pipeline…",
                );
            }
        },
    });

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function setBusy(busy) {
        submit.disabled = !pickedFile || busy;
        engineSelect.disabled = busy;
        cancel.style.display = busy ? "inline-block" : "none";
        progressWrap.style.display = busy ? "block" : progressWrap.style.display;
    }

    function setProgress(s) {
        progressWrap.style.display = "block";
        var pct = s.totalFrames
            ? Math.min(100, Math.round((100 * s.frames) / s.totalFrames))
            : 0;
        progressBar.style.width = pct + "%";
        setStatus(
            s.frames +
                (s.totalFrames ? " / " + s.totalFrames : "") +
                " frames  ·  " +
                s.fps.toFixed(1) +
                " fps  ·  " +
                (engine === "webgpu"
                    ? "WebGPU"
                    : "blend: " + (s.gpuBlend ? "WebGPU" : "CPU")) +
                (s.auto && s.reversals
                    ? "  ·  reversals: " + s.reversals
                    : ""),
        );
    }

    function showResult(url, report, usedEngine) {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        objectUrl = url;
        var video = document.getElementById("resultVideo");
        video.src = url;
        var download = document.getElementById("download");
        download.href = url;
        var fileName =
            "anaglyph." + (report.container === "webm" ? "webm" : "mp4");
        download.download = fileName;
        // Build a File for the Share sheet up front: navigator.share
        // must be called with the file synchronously inside the click
        // (user activation), so there is no room to fetch at share
        // time. While this is pending the link just downloads.
        resultFile = null;
        fetch(url)
            .then(function (r) {
                return r.blob();
            })
            .then(function (blob) {
                if (objectUrl !== url) return; // a newer result won
                resultFile = new File([blob], fileName, {
                    type:
                        blob.type ||
                        (report.container === "webm"
                            ? "video/webm"
                            : "video/mp4"),
                });
            })
            .catch(function () {}); // plain download stays available
        document.getElementById("result").style.display = "block";
        setStatus(
            "Done. (" +
                (usedEngine === "webgpu" ? "WebGPU pipeline" : "wasm pipeline") +
                ")",
        );
    }

    function setFile(file) {
        pickedFile = file;
        setBusy(false);
        if (file) {
            setStatus(
                "Ready: " + file.name + " (" + Math.round(file.size / 1e6) + " MB)",
            );
        }
    }

    document
        .getElementById("videoFile")
        .addEventListener("change", function (e) {
            setFile(e.target.files[0] || null);
        });

    document
        .getElementById("useSample")
        .addEventListener("click", async function () {
            setStatus("Loading sample clip…");
            // ?sample=<same-origin path> overrides the bundled clip
            // (tests use the longer bench fixture to test cancelling).
            var samplePath =
                new URLSearchParams(location.search).get("sample") ||
                "bench/rot.mp4";
            var response = await fetch(samplePath);
            if (!response.ok) {
                setStatus("Could not load the sample clip.");
                return;
            }
            var blob = await response.blob();
            var name = samplePath.split("/").pop();
            setFile(new File([blob], name, { type: blob.type }));
        });

    document
        .getElementById("videoForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            setBusy(true);
            progressWrap.style.display = "block";
            progressBar.style.width = "0%";
            setStatus("Starting… (" + (engine === "webgpu" ? "WebGPU" : "wasm") + ")");
            converter
                .convert(
                    {
                        file: pickedFile,
                        direction: document.getElementById("videoDirection").value,
                        anaglyphType: document.getElementById("anaglyphType").value,
                        acceleration: {
                            decode: document.getElementById("hwDecode").checked,
                            encode: document.getElementById("hwEncode").checked,
                            webgpu: document.getElementById("webgpuBlend").checked,
                        },
                        canvasCapture: document.getElementById("canvasCapture").checked,
                        encoderQuality: document.getElementById("encoderQuality").value,
                        onProgress: setProgress,
                    },
                    { engine: engine },
                )
                .then(function (res) {
                    showResult(res.url, res.report, res.engine);
                })
                .catch(function (err) {
                    if (err && err.name === "AbortError") {
                        setStatus(
                            err.workerReset
                                ? "Cancelled. The stuck worker was reset" +
                                      (pickedFile
                                          ? "; pick \u201c" + pickedFile.name + "\u201d again"
                                          : "") +
                                      "."
                                : "Cancelled.",
                        );
                    } else {
                        setStatus(
                            "Failed: " + (err && err.message ? err.message : err),
                        );
                    }
                })
                .then(function () {
                    setBusy(false);
                });
        });

    cancel.addEventListener("click", function () {
        setStatus("Cancelling…");
        converter.cancel();
    });

    // "Save": where the browser can share files (iOS/Android Safari
    // and Chrome, some desktop browsers) open the system share sheet;
    // everywhere else the <a download> keeps doing its plain-download
    // job untouched.
    document
        .getElementById("download")
        .addEventListener("click", function (event) {
            if (
                !resultFile ||
                !navigator.canShare ||
                !navigator.canShare({ files: [resultFile] })
            ) {
                return;
            }
            event.preventDefault();
            navigator
                .share({ files: [resultFile], title: "Anaglyph result" })
                .catch(function (err) {
                    if (err && err.name !== "AbortError") {
                        setStatus(
                            "Share failed: " +
                                (err.message || err) +
                                " — Save will download instead.",
                        );
                    }
                });
        });

    // Capability banner + engine default: WebCodecs is required by
    // both pipelines. iPhone/iPad boot on WebGPU, every other
    // browser on wasm; ?engine=webgpu|wasm overrides either way.
    (async function () {
        var support = await checkSupport();
        var lines = [];
        lines.push(
            "WebCodecs: " + (support.webcodecs ? "supported" : "NOT supported — video conversion needs a browser with WebCodecs (Chrome/Edge 94+, Firefox 130+, Safari 26+)"),
        );
        if (support.webcodecs) {
            lines.push(
                "H.264 encode: " + (support.h264Encode ? "supported" : "not available (WebM fallback will be used)"),
            );
        }
        lines.push(
            "WebGPU: " + (support.webgpu ? "adapter available" : "not available"),
        );

        // Engine default: iPhone/iPad boot on the all-GPU pipeline
        // (the device-verified path there; frames staying on the GPU
        // also suits iOS memory pressure). Every iOS browser is
        // WebKit, so the device alone is enough — no Safari
        // sniffing. The second clause catches iPadOS "Desktop site"
        // mode, whose UA claims Macintosh; real Macs have no touch
        // points. All other browsers boot on the wasm pipeline even
        // when an adapter is present; the choice stays switchable in
        // Advanced options and via ?engine=webgpu|wasm.
        var isIOSDevice =
            /iPhone|iPad/.test(navigator.userAgent) ||
            (navigator.platform === "MacIntel" &&
                navigator.maxTouchPoints > 1);
        var engineParam = new URLSearchParams(location.search).get(
            "engine",
        );
        engine =
            engineParam === "webgpu" || engineParam === "wasm"
                ? engineParam
                : isIOSDevice
                  ? "webgpu"
                  : "wasm";
        engineSelect.value = engine;
        var webgpuOption = engineSelect.querySelector(
            'option[value="webgpu"]',
        );
        if (!support.webgpu) {
            webgpuOption.textContent =
                "WebGPU (all-GPU, no wasm) — not available here";
            document.getElementById("engineNote").textContent =
                isIOSDevice
                    ? "iPhone/iPad start on the WebGPU pipeline even though the probe found no adapter: if none answers at run time the page falls back to the wasm pipeline."
                    : "No WebGPU adapter in this browser: only the wasm pipeline can run.";
        }
        var caps = document.getElementById("caps");
        caps.textContent = lines.join("  · ");
        caps.className =
            "alert py-2 " + (support.webcodecs ? "alert-secondary" : "alert-warning");
        syncEngineControls();
    })();
</script>
