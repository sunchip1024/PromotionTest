import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

function loadMaterial(baseUrl, fileUrl, onProgress) {
  const loader = new MTLLoader();
  loader.setPath(baseUrl);

  return new Promise((resolve, reject) => {
    loader.load(fileUrl, resolve, onProgress, reject);
  });
}

function loadObject(baseUrl, fileUrl, material, onProgress) {
  const loader = new OBJLoader();
  loader.setMaterials(material);
  loader.setPath(baseUrl);

  return new Promise((resolve, reject) => {
    loader.load(fileUrl, resolve, onProgress, reject);
  });
} 

function setModelTransform(object, modelTransform) {
  if(modelTransform.position !== undefined) {
    object.position.set(modelTransform.position.x, modelTransform.position.y, modelTransform.position.z);
  }

  if(modelTransform.scale !== undefined) {
    object.scale.set(modelTransform.scale.x, modelTransform.scale.y, modelTransform.scale.z);
  }

  if(modelTransform.rotation !== undefined) {
    object.rotation.x = modelTransform.rotation.x;
    object.rotation.y = modelTransform.rotation.y;
    object.rotation.z = modelTransform.rotation.z;
  }

  return new Promise((resolve) => resolve(object));
}

function setWorldTransform(object, worldTransfrom) {
  const mesh = new THREE.Object3D();
  mesh.add(object);

  if(worldTransfrom.position !== undefined) {
    mesh.position.set(worldTransfrom.position.x, worldTransfrom.position.y, worldTransfrom.position.z);
  }

  if(worldTransfrom.scale !== undefined) {
    mesh.scale.set(worldTransfrom.scale.x, worldTransfrom.scale.y, worldTransfrom.scale.z);
  }

  if(worldTransfrom.rotation !== undefined) {
    mesh.rotation.x = worldTransfrom.rotation.x;
    mesh.rotation.y = worldTransfrom.rotation.y;
    mesh.rotation.z = worldTransfrom.rotation.z;
  }

  return new Promise((resolve) => resolve(mesh));
}

function onMaterialLoading(xhr) {
  //console.log("loading material " + (xhr.loaded / xhr.total * 100) + "% complete!");
}

function onModelLoading(xhr) {
  //console.log("loading model " + (xhr.loaded / xhr.total * 100) + "% complete!");
}

class Headphone {
  constructor({ baseUrl, materialUrl, modelUrl, scene, modelTransform = undefined, worldTransform = undefined }) {
    this.mesh = undefined;
    loadMaterial(baseUrl, materialUrl, onMaterialLoading)
      .then(( material ) => loadObject(baseUrl, modelUrl, material, onModelLoading))
      .then(( object ) => setModelTransform(object, modelTransform))
      .then(( object ) => setWorldTransform(object, worldTransform))
      .then(( mesh ) => { scene.add(mesh); return this.mesh = mesh; })
      .then(( mesh ) => console.log(mesh))
      .catch(( err ) => console.error(err));
  }
}

export class HeadphoneOne extends Headphone {
  constructor({ scene, position = undefined, rotation = undefined, scale = undefined }) {
    const baseUrl = "./models/headphone_1/"
    const materialUrl = "headphone_1.mtl";
    const modelUrl = "headphone_1.obj";

    const worldTransform = { position, rotation, scale };
    const modelTransform = { scale: new THREE.Vector3(1, 1, 1) };

    super({baseUrl, materialUrl, modelUrl, scene, modelTransform, worldTransform});
  }
}

export class HeadphoneTwo extends Headphone {
  constructor({scene, position = undefined, rotation = undefined, scale = undefined}) {
    const baseUrl = "./models/headphone_2/"
    const materialUrl = "headphone_2.mtl";
    const modelUrl = "headphone_2.obj";

    const worldTransform = { position, rotation, scale };
    const modelTransform = {
      position: new THREE.Vector3(0, -2.5, 0),
      rotation: new THREE.Vector3(0, Math.PI / 2, 0),
      scale: new THREE.Vector3(30, 30, 30)
    };

    super({baseUrl, materialUrl, modelUrl, scene, modelTransform, worldTransform});
  }
}

export class HeadphoneThree extends Headphone {
  constructor({scene, position = undefined, rotation = undefined, scale = undefined}) {
    const baseUrl = "./models/headphone_3/"
    const materialUrl = "headphone_3.mtl";
    const modelUrl = "headphone_3.obj";

    const worldTransform = { position, rotation, scale };
    const modelTransform = {
      position: new THREE.Vector3(0, -6.3, 0),
      rotation: new THREE.Vector3(0, Math.PI / 2, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5)
    };

    super({baseUrl, materialUrl, modelUrl, scene, modelTransform, worldTransform});
  }
}