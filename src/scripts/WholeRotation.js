import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/Orbitcontrols";
import { HeadphoneOne, HeadphoneTwo, HeadphoneThree } from "./Headphone";

export function execute() {
    // Set Basic Properties
    const MODEL_LENGTH = 3;
    const MODEL_RADIUS = 15;
    const CAMERA_RADIUS = 25;
    const CAMERA_HORIZONTAL_ANGLE = 2 * Math.PI / 3;

    // Set Canvas
    const CANVAS = document.querySelector("#whole-objects-rotation");

    // Set Scene
    const SCENE = new THREE.Scene();
    SCENE.background = new THREE.Color("rgb(135, 206, 235)");

    // Set Camera
    const CAMERA_ORIGIN = new THREE.Object3D();
    CAMERA_ORIGIN.position.set(0, 0, 0);

    const CAMERA = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        50
    );
    CAMERA.position.set(0, 0, CAMERA_RADIUS);
    /*
    CAMERA_ORIGIN.add(CAMERA);
    CAMERA.position.set(0, 0, CAMERA_RADIUS);
    CAMERA.lookAt(CAMERA_ORIGIN.position);
    */

    // Set Renderer
    const RENDERER = new THREE.WebGLRenderer({canvas: CANVAS, antialias: true});
    RENDERER.setSize(window.innerWidth, window.innerHeight);
    RENDERER.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    function setSize() {
        CAMERA.aspect = window.innerWidth / window.innerHeight;
        CAMERA.updateProjectionMatrix();

        RENDERER.setSize(window.innerWidth, window.innerHeight);
        RENDERER.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        RENDERER.render(SCENE, CAMERA);
    }
    window.addEventListener("resize", setSize);

    // Set OrbitControls
    const CONTROLS = new OrbitControls( CAMERA, RENDERER.domElement );
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.05;
    CONTROLS.screenSpacePanning = false;
    CONTROLS.enableZoom = false;
    CONTROLS.rotateSpeed = 0.3;
    CONTROLS.minPolarAngle = Math.PI / 2;
    CONTROLS.maxPolarAngle = Math.PI / 2;
    CONTROLS.minAzimuthAngle = -(CAMERA_HORIZONTAL_ANGLE * 0.6);
    CONTROLS.maxAzimuthAngle = (CAMERA_HORIZONTAL_ANGLE * 0.6);

    // Set Light
    const LIGHT = new THREE.AmbientLight();
    SCENE.add(LIGHT);

    // Load Headset Model
    let ROTATE_UNIT = CAMERA_HORIZONTAL_ANGLE / (MODEL_LENGTH - 1);
    function GetModelRotation(index) { return -( CAMERA_HORIZONTAL_ANGLE / 2 ) + ROTATE_UNIT * index; }
    function GetModelPosition(index) {
        const theta = GetModelRotation(index);
        return new THREE.Vector3(MODEL_RADIUS * Math.sin(theta), 0, MODEL_RADIUS * Math.cos(theta));
    }

    const models = [];
    models.push(new HeadphoneOne({
        scene: SCENE, 
        position: GetModelPosition(0),
        rotation: new THREE.Vector3(0, GetModelRotation(0), 0)
    }));
    models.push(new HeadphoneTwo({
        scene: SCENE, 
        position: GetModelPosition(1),
        rotation: new THREE.Vector3(0, GetModelRotation(1), 0)
    }));
    models.push(new HeadphoneThree({
        scene: SCENE, 
        position: GetModelPosition(2),
        rotation: new THREE.Vector3(0, GetModelRotation(2), 0)
    }));

    // Update Function Logic
    const clock = new THREE.Clock();
    function draw() {
        // Camera is Always look at center
        CAMERA.lookAt(CAMERA_ORIGIN.position);

        CONTROLS.update();

        // Rendering
        RENDERER.render(SCENE, CAMERA);
        RENDERER.setAnimationLoop(draw);
    }
    draw();
}