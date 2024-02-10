import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/Orbitcontrols";
import { HeadphoneOne, HeadphoneTwo, HeadphoneThree } from "./Headphone";

const PAGE_SIZE = 3
const SETTINGS = {
    model_length: PAGE_SIZE,
    model_radius: 15,
    camera_radius: 25,
    camera_horizontal_angle: (2 / 3 * Math.PI)
};

const CANVAS = document.querySelector("#whole-objects-rotation");
const THREE_ENGINE = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 ),
    renderer: new THREE.WebGLRenderer({canvas: CANVAS, antialias: true}),
};

const MODELS = [];

export function Initialize() {
    // Set Scene
    THREE_ENGINE.scene.background = new THREE.Color("rgb(135, 206, 235)");

    // Set Camera
    THREE_ENGINE.camera.position.set(0, 0, SETTINGS.camera_radius);
    
    // Set Renderer
    THREE_ENGINE.renderer.setSize(window.innerWidth, window.innerHeight);
    THREE_ENGINE.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    function setSize() {
        THREE_ENGINE.camera.aspect = window.innerWidth / window.innerHeight;
        THREE_ENGINE.camera.updateProjectionMatrix();

        THREE_ENGINE.renderer.setSize(window.innerWidth, window.innerHeight);
        THREE_ENGINE.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        THREE_ENGINE.renderer.render(THREE_ENGINE.scene, THREE_ENGINE.camera);
    }
    window.addEventListener("resize", setSize);

    // Set OrbitControls
    const CONTROLS = new OrbitControls( THREE_ENGINE.camera, THREE_ENGINE.renderer.domElement );
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.05;
    CONTROLS.screenSpacePanning = false;
    CONTROLS.enableZoom = false;
    CONTROLS.rotateSpeed = 0.3;
    CONTROLS.minPolarAngle = Math.PI / 2;
    CONTROLS.maxPolarAngle = Math.PI / 2;
    CONTROLS.minAzimuthAngle = -(SETTINGS.camera_horizontal_angle * 0.5);
    CONTROLS.maxAzimuthAngle = (SETTINGS.camera_horizontal_angle * 0.5);

    // Set Light
    const LIGHT = new THREE.AmbientLight();
    THREE_ENGINE.scene.add(LIGHT);

    // Load Headset Model
    const ROTATE_UNIT = SETTINGS.camera_horizontal_angle / (SETTINGS.model_length - 1);
    function GetModelRotation(index) { return -( SETTINGS.camera_horizontal_angle / 2 ) + ROTATE_UNIT * index; }
    function GetModelPosition(index) {
        const theta = GetModelRotation(index);
        return new THREE.Vector3(SETTINGS.model_radius * Math.sin(theta), 0, SETTINGS.model_radius * Math.cos(theta));
    }

    MODELS.push(new HeadphoneOne({
        url: "./models/headphone1.fbx",
        scene: THREE_ENGINE.scene,
        position: GetModelPosition(0),
        rotation: new THREE.Vector3(0, GetModelRotation(0), 0)
    }));
    
    MODELS.push(new HeadphoneTwo({
        url: "./models/headphone2.fbx",
        scene: THREE_ENGINE.scene,
        position: GetModelPosition(1),
        rotation: new THREE.Vector3(0, GetModelRotation(1), 0)
    }));
    
    MODELS.push(new HeadphoneThree({
        url: "./models/headphone3.fbx",
        scene: THREE_ENGINE.scene,
        position: GetModelPosition(2),
        rotation: new THREE.Vector3(0, GetModelRotation(2), 0)
    }));

    // Update Function Logic
    const clock = new THREE.Clock();
    const ORIGIN = new THREE.Vector3(0, 0, 0);
    function draw() {
        // Camera is Always look at center
        THREE_ENGINE.camera.lookAt(ORIGIN);

        CONTROLS.update();

        // Rendering
        THREE_ENGINE.renderer.render(THREE_ENGINE.scene, THREE_ENGINE.camera);
        THREE_ENGINE.renderer.setAnimationLoop(draw);
    }
    draw();
}