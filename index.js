let threeDDiv = document.querySelector("#temple-div");

async function threeD() {


let dimensions = {
width: threeDDiv.offsetWidth,
height: threeDDiv.offsetHeight-10,
margin: {
top: 100,
right: 70,
bottom: 100,
left: 70,
},
};


threeDDiv.setAttribute("style", "width :" + dimensions.width + "px; height :" + dimensions.height + "px");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xFFFFFF);

const camera = new THREE.PerspectiveCamera(10, dimensions.width/dimensions.height, 1, 10000);

const renderer = new THREE.WebGLRenderer({antialias : true});

renderer.setSize(dimensions.width, dimensions.height);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
// renderer.shadowMapType = THREE.PCFSoftShadowMap;

threeDDiv.appendChild(renderer.domElement);

let ambientLight = new THREE.AmbientLight(0x666666, 1);

scene.add(ambientLight);

var light;

light = new THREE.DirectionalLight(0xdfebff, 1.75);
light.position.set(200, 400, 50);
light.position.multiplyScalar(1.3);

light.castShadow = true;
// light.shadowCameraVisible = true;

light.shadow.mapSize.width = 5000;
light.shadow.mapSize.height = 5000;

light.shadow.radius = 40;

var d = 100;

light.shadow.camera.left = -d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = -d;

light.shadow.camera.far = 1000;
light.shadowDarkness = 0.75;

scene.add(light);

// light 2

const light2 = new THREE.PointLight( 0xff0000, 4, 10000 );
light2.position.set( 0, 20, 0 );

// offsetWidth is 112 to 224
// multiplier from 9 to 4

// let n = (350 - threeDDiv.offsetWidth) / 25;
let n;


console.log(threeDDiv.offsetWidth)
// camera.position.set(-dimensions.height/(n/4),dimensions.height*3,dimensions.height*(n));
camera.position.set(-dimensions.height/5,dimensions.height*3,dimensions.height*9);


// orbit controls

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed *= -1;

controls.addEventListener('start', function(){
controls.autoRotate = false;
});



// const materialTemple = new THREE.MeshNormalMaterial({color: 0x0aeedf});
var materialTemple = new THREE.MeshLambertMaterial({
color: 0x0aeedf
});

var materialPlane = new THREE.MeshPhongMaterial({
color: 0xffffff
});


let plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000), materialPlane);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -55;
plane.receiveShadow = true;
plane.castShadow = true;

scene.add(plane);



// add gltf

    function loadGLTFRoof(GLTFName) {

            var loader = new THREE.GLTFLoader();

            loader.load(GLTFName, function(gltf) {
    
                loadedGLTF = gltf.scene;
                scene.add(loadedGLTF);

                //gltf material
    
                gltf.scene.traverse((o) => {
                    if(o.isMesh) o.material = materialTemple;
                    if( o.material ) {
                        o.material.side = THREE.DoubleSide;
                    }
                })

                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                      child.castShadow = true;
                      child.receiveShadow = true;
                    }
                 });

                init();
    
            }, undefined, function(error) {
                console.log(error);
            })
            
    }

    // offsetWidth is 112 to 224
    // scale is 10 to 15   

    function init() {
        loadedGLTF.scale.x = Math.sqrt(threeDDiv.offsetWidth);
        loadedGLTF.scale.y = Math.sqrt(threeDDiv.offsetWidth);
        loadedGLTF.scale.z = Math.sqrt(threeDDiv.offsetWidth);

        // loadedGLTF.rotation.y = Math.PI / 14;

        // loadedGLTF.position.x = -42.05;
        loadedGLTF.position.y = -60;
        // loadedGLTF.position.z = 23.2;
    }

    function loadGLTFBase(GLTFName) {

        var loader = new THREE.GLTFLoader();

        loader.load(GLTFName, function(gltf) {

            loadedGLTF = gltf.scene;
            scene.add(loadedGLTF);

            //gltf material

            gltf.scene.traverse((o) => {
                if(o.isMesh) o.material = materialTemple;
                if( o.material ) {
                    o.material.side = THREE.DoubleSide;
                } 
            });

            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
            });

            init2();

        }, undefined, function(error) {
            console.log(error);
        })
        
    }

    function init2() {
        loadedGLTF.scale.x = Math.sqrt(threeDDiv.offsetWidth);
        loadedGLTF.scale.y = Math.sqrt(threeDDiv.offsetWidth);
        loadedGLTF.scale.z = Math.sqrt(threeDDiv.offsetWidth);

        loadedGLTF.castShadow = true;
        loadedGLTF.receiveShadow = true;

        // loadedGLTF.rotation.y = Math.PI / 14;

        // loadedGLTF.position.x = -42.05;
        loadedGLTF.position.y = -60;
        // loadedGLTF.position.z = 23.2;
    }

    loadGLTFRoof("GLTFs/roof 4.glb");
    loadGLTFBase("GLTFs/base 4.glb");


const size = 500;
const divisions = 25;

const gridHelper = new THREE.GridHelper( size, divisions );
// scene.add( gridHelper );


// animate function

function animate() {

requestAnimationFrame(animate);
renderer.render(scene , camera);

controls.update();


}

animate();

}

threeD();

