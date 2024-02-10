import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/Orbitcontrols";
import { HeadphoneOne, HeadphoneTwo, HeadphoneThree } from "./Headphone";

const PAGE_SIZE = 3;
const SETTINGS = {
    model_length: PAGE_SIZE,
    camera_min_radius: 10,
    camera_max_radius: 15
};

// Set Canvas
const CANVAS = document.querySelector("#part-object-rotation");
const THREE_ENGINE = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera( 75, (window.innerWidth * 0.5) / window.innerHeight, 0.1, 1000 ),
    renderer: new THREE.WebGLRenderer({canvas: CANVAS, antialias: true})
};
// Set Controller
const CONTROLS = new OrbitControls( THREE_ENGINE.camera, THREE_ENGINE.renderer.domElement );

const MODEL_CONTROLLER = {
    current: undefined,
    models: []
};

export function Initialize() {
    // Set Scene
    THREE_ENGINE.scene.background = new THREE.Color("rgb(125, 125, 125)");
    THREE_ENGINE.scene.backgroundBlurriness = 0.5;

    // Set Camera
    THREE_ENGINE.camera.position.set(0, 0, SETTINGS.camera_min_radius);

    // Set Renderer
    THREE_ENGINE.renderer.setSize((window.innerWidth * 0.5),  window.innerHeight);
    THREE_ENGINE.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    function setSize() {
        THREE_ENGINE.camera.aspect = (window.innerWidth * 0.5) / window.innerHeight;
        THREE_ENGINE.camera.updateProjectionMatrix();

        THREE_ENGINE.renderer.setSize((window.innerWidth * 0.5), window.innerHeight);
    }
    window.addEventListener("resize", setSize);
        
    // Set Light
    const LIGHT = new THREE.AmbientLight();
    const pointLight = new THREE.PointLight( 0xffffff, 15 );
    THREE_ENGINE.scene.add(LIGHT);
	THREE_ENGINE.camera.add( pointLight );
    THREE_ENGINE.scene.add( THREE_ENGINE.camera );

    // Set Controller
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.05;
    CONTROLS.screenSpacePanning = false;
    CONTROLS.minDistance = SETTINGS.camera_min_radius;
    CONTROLS.maxDistance = SETTINGS.camera_max_radius;

    // Load Headset Model
    MODEL_CONTROLLER.models.push(new HeadphoneOne({ scene: THREE_ENGINE.scene }));
    MODEL_CONTROLLER.models.push(new HeadphoneTwo({}));
    MODEL_CONTROLLER.models.push(new HeadphoneThree({}));

    // Update Loop Function
    const ORIGIN = new THREE.Vector3(0, 0, 0);
    function draw() { 
        CONTROLS.update();
        THREE_ENGINE.camera.lookAt(ORIGIN);

        THREE_ENGINE.renderer.render(THREE_ENGINE.scene, THREE_ENGINE.camera);
        requestAnimationFrame(draw);
    }
    draw();
}

export function ActiveModel(modelIndex) {
    if(MODEL_CONTROLLER.models[modelIndex].mesh === undefined)   return;

    if(MODEL_CONTROLLER.current !== undefined) {
        THREE_ENGINE.scene.remove( MODEL_CONTROLLER.models[ MODEL_CONTROLLER.current ].mesh );
        MODEL_CONTROLLER.current = undefined;
    }

    THREE_ENGINE.scene.add( MODEL_CONTROLLER.models[modelIndex].mesh );
    MODEL_CONTROLLER.current = modelIndex;
} 