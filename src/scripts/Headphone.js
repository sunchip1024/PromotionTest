import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function loadMaterial({url}) {
    const loader = new MTLLoader();

    return new Promise((resolve, reject) => {
        loader.load({url: url, onLoad: resolve, onError: reject});
    });
}

function loadObject({url, material}) {
    const loader = new OBJLoader();
    loader.setMaterials(material);

    return new Promise((resolve, reject) => {
        loader.load({url: url, onLoad: resolve, onError: reject});
    });
} 

function setTransform({object, scene, position = undefined, rotation = undefined, scale = undefined}) {
    const mesh = new THREE.Object3D();
    mesh.add(object);

    if(position !== undefined) {
        mesh.position.set(position.x, position.y, position.z);
    }

    if(scale !== undefined) {
        mesh.scale.set(scale.x, scale.y, scale.z);
    }

    if(rotation !== undefined) {
        mesh.rotation.x = rotation.x;
        mesh.rotation.y = rotation.y;
        mesh.rotation.z = rotation.z;
    }

    scene.add(mesh);

    return new Promise((resolve, reject) => mesh);
}

export class HeadphoneOne {
    constructor({ scene, position = undefined, rotation = undefined, scale = undefined }) {
        const materialUrl = "./models/headphone_1/headphone_1.mtl";
        const modelUrl = "./models/headphone_1/headphone_1.obj";

        loadMaterial(materialUrl)
            .then(( material ) => loadObject(modelUrl, material))
            .then(( object ) => setTransform(object, scene, position, rotation, scale))
            .catch(( err ) => console.error(err));
    }
}

export class HeadphoneTwo {
    constructor({scene, position = undefined, rotation = undefined, scale = undefined}) {
        new MTLLoader()
            .setPath("./models/headphone_2/")
            .load("headphone_2.mtl", ( materials ) => {
                materials.preload();
                new OBJLoader()
                    .setMaterials( materials )
                    .setPath("./models/headphone_2/")
                    .load("headphone_2.obj", ( object ) => {
                        object.position.set(0, -3, 0);
                        object.rotation.y = Math.PI / 2;
                        object.scale.set(30, 30, 30);

                        this.mesh = new THREE.Object3D();
                        this.mesh.add(object);

                        if(position !== undefined) {
                            this.mesh.position.set(position.x, position.y, position.z);
                        }

                        if(scale !== undefined) {
                            this.mesh.scale.set(scale.x, scale.y, scale.z);
                        }

                        if(rotation !== undefined) {
                            this.mesh.rotation.x = rotation.x;
                            this.mesh.rotation.y = rotation.y;
                            this.mesh.rotation.z = rotation.z;
                        }

                        scene.add(this.mesh);
                    });
            });
    }
}

export class HeadphoneThree {
    constructor({scene, position = undefined, rotation = undefined, scale = undefined}) {
        new MTLLoader()
            .setPath("./models/headphone_3/")
            .load("uploads_files_4604677_untitled.mtl", ( materials ) => {
                materials.preload();
                new OBJLoader()
                    .setMaterials( materials )
                    .setPath("./models/headphone_3/")
                    .load("uploads_files_4604677_untitled.obj", ( object ) => {
                        object.position.set(0, -6.5, 0);
                        object.rotation.y = Math.PI / 2;
                        object.scale.set(0.5, 0.5, 0.5);

                        this.mesh = new THREE.Object3D();
                        this.mesh.add(object);

                        if(position !== undefined) {
                            this.mesh.position.set(position.x, position.y, position.z);
                        }

                        if(scale !== undefined) {
                            this.mesh.scale.set(scale.x, scale.y, scale.z);
                        }

                        if(rotation !== undefined) {
                            this.mesh.rotation.x = rotation.x;
                            this.mesh.rotation.y = rotation.y;
                            this.mesh.rotation.z = rotation.z;
                        }

                        scene.add(this.mesh);
                    });
            });
    }
}