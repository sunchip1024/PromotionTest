import { FBXLoader as FBX } from "three/examples/jsm/loaders/FBXLoader";

export default class FBXLoader {
    static #loader;
    static {
        FBXLoader.#loader = new FBX();
    }

    static load = function(url, onLoad, onProgress = undefined, onError = undefined) {
        if(typeof onProgress === 'function') {
            if(typeof onError === 'function')
                FBXLoader.#loader.load(url, onLoad, onProgress, onError);
            else if(typeof onError === 'undefined')
                FBXLoader.#loader.load(url, onLoad, onProgress);
            else
                throw new TypeError("[ ObjectLoader - load ] must onError parameter use function type!");
        } else if(typeof onProgress === 'undefined')
            FBXLoader.#loader.load(url, onLoad);
        else
            throw new TypeError("[ ObjectLoader - load ] must onProgress parameter use function type!");
    }
}