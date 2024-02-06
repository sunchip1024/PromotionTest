import * as THREE from "three";
import { HeadphoneOne, HeadphoneTwo, HeadphoneThree } from "./Headphone";

export function execute() {
    // Set Basic Properties
    const MODEL_LENGTH = 3;
    const MODEL_RADIUS = 12;
    const CAMERA_RADIUS = 23;

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
    CAMERA_ORIGIN.add(CAMERA);
    CAMERA.position.set(0, 0, CAMERA_RADIUS);
    CAMERA.lookAt(CAMERA_ORIGIN.position);

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

    
    
    // Set Light
    const LIGHT = new THREE.AmbientLight();
    SCENE.add(LIGHT);

    // Load Headset Model
    const models = [];

    let ROTATE_UNIT = 2 * Math.PI / MODEL_LENGTH;
    models.push(new HeadphoneOne({
        scene: SCENE, 
        position: new THREE.Vector3(MODEL_RADIUS * Math.sin(ROTATE_UNIT * 0), 0, MODEL_RADIUS * Math.cos(ROTATE_UNIT * 0)),
        rotation: new THREE.Vector3(0, ROTATE_UNIT * 0, 0)
    }));
    models.push(new HeadphoneTwo({
        scene: SCENE, 
        position: new THREE.Vector3(MODEL_RADIUS * Math.sin(ROTATE_UNIT * 1), 0, MODEL_RADIUS * Math.cos(ROTATE_UNIT * 1)),
        rotation: new THREE.Vector3(0, ROTATE_UNIT * 1, 0)
    }));
    models.push(new HeadphoneThree({
        scene: SCENE, 
        position: new THREE.Vector3(MODEL_RADIUS * Math.sin(ROTATE_UNIT * 2), 0, MODEL_RADIUS * Math.cos(ROTATE_UNIT * 2)),
        rotation: new THREE.Vector3(0, ROTATE_UNIT * 2, 0)
    }));

    // Update Function Logic
    const clock = new THREE.Clock();
    function draw() {
        // TO-DO : Rotate 'CAMERA_ORIGIN' to drag raycast
        CAMERA_ORIGIN.rotation.y += 0.1 * Math.PI * clock.getDelta();

        // Camera is Always look at center
        CAMERA.lookAt(CAMERA_ORIGIN.position);

        // Rendering
        RENDERER.render(SCENE, CAMERA);
        RENDERER.setAnimationLoop(draw);
    }
    draw();
}