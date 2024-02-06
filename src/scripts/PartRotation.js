import * as THREE from "three";
import { HeadphoneOne, HeadphoneTwo, HeadphoneThree } from "./Headphone";

export function execute(modelIndex) {
    // Set Canvas
    const CANVAS = document.querySelector("#part-object-rotation");

    // Set Scene
    const SCENE = new THREE.Scene();
    SCENE.background = new THREE.Color("rgb(125, 125, 125)");
    SCENE.backgroundBlurriness = 0.5;

    // Set Camera
    const CAMERA_RADIUS = 10;
    const CAMERA = new THREE.PerspectiveCamera(
        75,
        (window.innerWidth * 0.5) / window.innerHeight,
        0.1,
        1000
    );
    CAMERA.position.set(0, 0, CAMERA_RADIUS);
    CAMERA.lookAt(new THREE.Vector3(0, 0, 0));

    // Set Renderer
    const RENDERER = new THREE.WebGLRenderer({canvas: CANVAS, antialias: true});
    RENDERER.setSize((window.innerWidth * 0.5),  window.innerHeight);
    RENDERER.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    function setSize() {
        CAMERA.aspect = (window.innerWidth * 0.5) / window.innerHeight;
        CAMERA.updateProjectionMatrix();

        RENDERER.setSize((window.innerWidth * 0.5), window.innerHeight);
    }
    window.addEventListener("resize", setSize);
    
    // Set Light
    const LIGHT = new THREE.AmbientLight();
    SCENE.add(LIGHT);

    const pointLight = new THREE.PointLight( 0xffffff, 15 );
	CAMERA.add( pointLight );
    SCENE.add(CAMERA);

    // Load Headset Model
    let model = undefined;
    if(modelIndex === 1) {
        model = new HeadphoneOne({scene: SCENE});
    } else if(modelIndex === 2) {
        model = new HeadphoneTwo({scene: SCENE});
    } else if(modelIndex === 3) {
        model = new HeadphoneThree({scene: SCENE});
    }

    // Update Loop Function
    const clock = new THREE.Clock();

    let cameraTheta = 0;
    function RotateCamera() {
        cameraTheta += (-0.2 * Math.PI * clock.getDelta());
        CAMERA.position.set(CAMERA_RADIUS * Math.sin(cameraTheta), 0, CAMERA_RADIUS * Math.cos(cameraTheta));
        CAMERA.lookAt(new THREE.Vector3(0, 0, 0));
    }

    function draw() { 
        RotateCamera();
        RENDERER.render(SCENE, CAMERA);
        requestAnimationFrame(draw);
    }
    draw();
}