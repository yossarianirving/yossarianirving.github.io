let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

const AnaglyphFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_anaglyph_free(ptr >>> 0));
/**
*/
export class Anaglyph {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Anaglyph.prototype);
        obj.__wbg_ptr = ptr;
        AnaglyphFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AnaglyphFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_anaglyph_free(ptr);
    }
    /**
    * @returns {number}
    */
    get_height() {
        const ret = wasm.__wbg_get_anaglyphresult_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {string | undefined} anaglyph_type
    * @param {number} offset_x
    * @param {number} offset_y
    * @returns {AnaglyphResult}
    */
    to_anaglyph(anaglyph_type, offset_x, offset_y) {
        var ptr0 = isLikeNone(anaglyph_type) ? 0 : passStringToWasm0(anaglyph_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.anaglyph_to_anaglyph(this.__wbg_ptr, ptr0, len0, offset_x, offset_y);
        return AnaglyphResult.__wrap(ret);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {Uint8Array} left_image
    * @returns {boolean}
    */
    set_left_image(width, height, left_image) {
        const ptr0 = passArray8ToWasm0(left_image, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.anaglyph_set_left_image(this.__wbg_ptr, width, height, ptr0, len0);
        return ret !== 0;
    }
    /**
    * @param {string | undefined} [anaglyph_type]
    * @param {string | undefined} [video_direction]
    * @returns {Uint8Array}
    */
    gif_to_anaglyph(anaglyph_type, video_direction) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            var ptr0 = isLikeNone(anaglyph_type) ? 0 : passStringToWasm0(anaglyph_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            var ptr1 = isLikeNone(video_direction) ? 0 : passStringToWasm0(video_direction, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            wasm.anaglyph_gif_to_anaglyph(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v3 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {Uint8Array} right_image
    * @returns {boolean}
    */
    set_right_image(width, height, right_image) {
        const ptr0 = passArray8ToWasm0(right_image, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.anaglyph_set_right_image(this.__wbg_ptr, width, height, ptr0, len0);
        return ret !== 0;
    }
    /**
    * @param {Uint8Array} left_image
    */
    set_left_image_raw(left_image) {
        const ptr0 = passArray8ToWasm0(left_image, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.anaglyph_set_left_image_raw(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @param {Uint8Array} right_image
    */
    set_right_image_raw(right_image) {
        const ptr0 = passArray8ToWasm0(right_image, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.anaglyph_set_right_image_raw(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @param {Uint8Array} stereo_image
    * @returns {boolean}
    */
    set_stereoscopic_image(width, height, stereo_image) {
        const ptr0 = passArray8ToWasm0(stereo_image, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.anaglyph_set_stereoscopic_image(this.__wbg_ptr, width, height, ptr0, len0);
        return ret !== 0;
    }
    /**
    * @returns {Anaglyph}
    */
    static new() {
        const ret = wasm.anaglyph_new();
        return Anaglyph.__wrap(ret);
    }
    /**
    * @param {Uint8Array} gif
    */
    set_gif(gif) {
        const ptr0 = passArray8ToWasm0(gif, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.anaglyph_set_gif(this.__wbg_ptr, ptr0, len0);
    }
    /**
    * @returns {number}
    */
    get_width() {
        const ret = wasm.__wbg_get_anaglyphresult_height(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const AnaglyphResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_anaglyphresult_free(ptr >>> 0));
/**
*/
export class AnaglyphResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(AnaglyphResult.prototype);
        obj.__wbg_ptr = ptr;
        AnaglyphResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AnaglyphResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_anaglyphresult_free(ptr);
    }
    /**
    * @returns {Uint8Array}
    */
    get_image() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.anaglyphresult_get_image(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1, 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {number}
    */
    get height() {
        const ret = wasm.__wbg_get_anaglyphresult_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set height(arg0) {
        wasm.__wbg_set_anaglyphresult_height(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get width() {
        const ret = wasm.__wbg_get_anaglyphresult_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set width(arg0) {
        wasm.__wbg_set_anaglyphresult_width(this.__wbg_ptr, arg0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_time_2c9ba8df2c0b364e = function(arg0, arg1) {
        console.time(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_timeEnd_d6fcb4eac2e76fb9 = function(arg0, arg1) {
        console.timeEnd(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('anaglyph_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
