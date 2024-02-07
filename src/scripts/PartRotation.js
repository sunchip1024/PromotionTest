import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/Orbitcontrols";
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

    const CONTROLS = new OrbitControls( CAMERA, RENDERER.domElement );
    CONTROLS.enableDamping = true;
    CONTROLS.dampingFactor = 0.05;
    CONTROLS.screenSpacePanning = false;
    CONTROLS.minDistance = CAMERA_RADIUS;
    CONTROLS.maxDistance = 1.5 * CAMERA_RADIUS;

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
    function draw() { 
        CONTROLS.update();
        CAMERA.lookAt(new THREE.Vector3(0, 0, 0));

        RENDERER.render(SCENE, CAMERA);
        requestAnimationFrame(draw);
    }
    draw();
}