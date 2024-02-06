import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default class ObjectLoader {
    static #ObjLoader;
    static {
        ObjectLoader.#ObjLoader = new OBJLoader();
    }

    static load = function(url, onLoad, onProgress = undefined, onError = undefined) {
        if(typeof onProgress === 'function') {
            if(typeof onError === 'function')
                ObjectLoader.#ObjLoader.load(url, onLoad, onProgress, onError);
            else if(typeof onError === 'undefined')
                ObjectLoader.#ObjLoader.load(url, onLoad, onProgress);
            else
                throw new TypeError("[ ObjectLoader - load ] must onError parameter use function type!");
        } else if(typeof onProgress === 'undefined')
            ObjectLoader.#ObjLoader.load(url, onLoad);
        else
            throw new TypeError("[ ObjectLoader - load ] must onProgress parameter use function type!");
    }
}