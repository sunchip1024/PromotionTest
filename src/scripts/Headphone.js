import * as THREE from "three";
import ObjectLoader from "./ObjectLoader";

function SetMeshTransform({mesh, position = undefined, rotation = undefined, scale = undefined}) {
    if(typeof position !== 'undefined') {
        mesh.position.set(position.x, position.y, position.z);
    }

    if(typeof rotation !== 'undefined') {
        mesh.rotation.x = rotation.x; mesh.rotation.y = rotation.y; mesh.rotation.z = rotation.z;
    }

    if(typeof scale !== 'undefined') {
        mesh.scale.set(scale.x, scale.y, scale.z);
    }
}

export class Headphone {
    constructor({url, scene, position = undefined, rotation = undefined, scale = undefined, mesh = undefined}) {
        this.scene = scene;
        this.mesh = undefined;

        ObjectLoader.load(url, (obj) => {
            this.LoadBasic({obj, position, rotation, scale, mesh});
            console.log("[ Headphone - " + url + " ] ", this.mesh);
        });
    }

    LoadBasic({obj, position = undefined, rotation = undefined, scale = undefined, mesh = undefined}) {
        if(typeof position !== 'undefined') {
            obj.position.set(position.x, position.y, position.z);
        }

        if(typeof rotation !== 'undefined') {
            obj.rotation.x = rotation.x; obj.rotation.y = rotation.y; obj.rotation.z = rotation.z;
        }
        
        if(typeof scale !== 'undefined') {
            obj.scale.set(scale.x, scale.y, scale.z);
        }

        this.mesh = new THREE.Object3D();
        this.mesh.add(obj);

        if(mesh !== undefined) {
            this.mesh.position.set(mesh.position.x, mesh.position.y, mesh.position.z);
            this.mesh.rotation.x = mesh.rotation.x; this.mesh.rotation.y = mesh.rotation.y; this.mesh.rotation.z = mesh.rotation.z;
            this.mesh.scale.set(mesh.scale.x, mesh.scale.y, mesh.scale.z);
        }

        this.scene.add(this.mesh);
    }
}

export class HeadphoneOne extends Headphone {
    constructor({ scene, position = undefined, rotation = undefined, scale = undefined}) {
        const url = "./models/headphone_1.obj";

        const mesh = new THREE.Object3D();
        SetMeshTransform({mesh: mesh, position: position, rotation: rotation, scale: scale});

        super({
            url: url, 
            scene: scene,
            mesh: mesh
        });
    }
}

export class HeadphoneTwo extends Headphone {
    constructor({scene, position = undefined, rotation = undefined, scale = undefined}) {
        const url = "./models/headphone_2.obj";

        const mesh = new THREE.Object3D();
        SetMeshTransform({mesh: mesh, position: position, rotation: rotation, scale: scale});

        super({
            url: url, 
            scene: scene, 
            position: new THREE.Vector3(0, -3, 0), 
            rotation: new THREE.Vector3(0, Math.PI / 2, 0), 
            scale: new THREE.Vector3(30, 30, 30),
            mesh: mesh
        });
    }
}

export class HeadphoneThree extends Headphone {
    constructor({scene, position = undefined, rotation = undefined, scale = undefined}) {
        const url = "./models/headphone_3.obj";

        const mesh = new THREE.Object3D();
        SetMeshTransform({mesh: mesh, position: position, rotation: rotation, scale: scale});

        super({
            url: url, 
            scene: scene, 
            position: new THREE.Vector3(0, -6.5, 0), 
            rotation: new THREE.Vector3(0, Math.PI / 2, 0), 
            scale: new THREE.Vector3(0.5, 0.5, 0.5),
            mesh: mesh
        });
    }
}