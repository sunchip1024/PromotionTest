import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function SetMeshPosition(mesh, position = undefined, rotation = undefined, scale = undefined) {
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
}

export class Headphone {
    constructor({ url, scene, position = undefined, rotation = undefined, scale = undefined, mesh = undefined }) {
        const loader = new FBXLoader();
        loader.load(url, ( object ) => {
            SetMeshPosition(object, position, rotation, scale);

            this.mesh = new THREE.Object3D();
            this.mesh.add(object);
            SetMeshPosition(this.mesh, mesh.position, mesh.rotation, mesh.scale);

            scene.add(this.mesh);
        });
    }
}

export class HeadphoneOne extends Headphone {
    constructor({ scene, position = undefined, rotation = undefined, scale = undefined }) {
        const mesh = new THREE.Object3D();
        SetMeshPosition(mesh, position, rotation, scale);

        super({ 
            url: "./models/headphone1.fbx",
            scene: scene,
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(0.01, 0.01, 0.01),
            mesh: mesh
        });
    }
}

export class HeadphoneTwo extends Headphone {
    constructor({ scene, position = undefined, rotation = undefined, scale = undefined }) {
        const mesh = new THREE.Object3D();
        SetMeshPosition(mesh, position, rotation, scale);

        super({ 
            url: "./models/headphone2.fbx",
            scene: scene,
            position: new THREE.Vector3(0, -2.5, 0),
            rotation: new THREE.Vector3(0, Math.PI / 2, 0),
            scale: new THREE.Vector3(0.3, 0.3, 0.3),
            mesh: mesh
        });
    }
}

export class HeadphoneThree extends Headphone {
    constructor({ scene, position = undefined, rotation = undefined, scale = undefined }) {
        const mesh = new THREE.Object3D();
        SetMeshPosition(mesh, position, rotation, scale);

        super({ 
            url: "./models/headphone3.fbx",
            scene: scene,
            position: new THREE.Vector3(0, -6, 0),
            rotation: new THREE.Vector3(0, Math.PI / 2, 0),
            scale: new THREE.Vector3(0.005, 0.005, 0.005),
            mesh: mesh
        });
    }
}