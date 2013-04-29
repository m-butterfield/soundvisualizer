$(document).ready(function($) {

    // set the scene size
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

    // set some camera attributes
    var VIEW_ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 10000;

    // get the DOM element to attach to
    var $body = $('#body');

    // create a WebGLrenderer, camera
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var camera =
      new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR);
    

    var scene = new THREE.Scene();

    // add the camera to the scene
    scene.add(camera);

    // the camera starts at 0,0,0
    // so pull it back
    camera.position.z = 500;

    // start therenderer
   renderer.setSize(WIDTH, HEIGHT);

    // attach the -supplied DOM element
    $body.append(renderer.domElement);
    
    
    var sphereMaterial =
        new THREE.MeshLambertMaterial(
          {
            color: 0x3333cc
          });
    
    // set up the sphere vars
    var radius = 40,
        segments = 20,
        rings = 20;

    // create a new mesh with
    // sphere geometry
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
    
    var drumSphere1 = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
    var drumSphere2 = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
    
    var sphereFlangeL = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
    var sphereFlangeR = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
    
    drumSphere1.position.x = 100;
    drumSphere2.position.x = -100;
    
    sphereFlangeL.position.x = -250;
    sphereFlangeR.position.x = 250;
    
 // create a point light
    var pointLight =
      new THREE.PointLight(0xFFFFFF);

    // set its position
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 130;

    // add to the scene
    scene.add(pointLight);
    scene.add(sphere);
    scene.add(drumSphere1);
    scene.add(drumSphere2);
    scene.add(sphereFlangeL);
    scene.add(sphereFlangeR);
    
    function animate () {
        
        requestAnimationFrame( animate );

        timer = document.getElementById('song').currentTime;
        amplitude = Math.floor( timer * 30 - 1 );
        
        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;
        
        drumSphere1.rotation.x += 0.001;
        drumSphere1.rotation.y += 0.002;
        
        drumSphere2.rotation.x += -0.001;
        drumSphere2.rotation.y += -0.002;
        
        sphereFlangeL.rotation.x += 0.001;
        sphereFlangeL.rotation.y += 0.002;
        
        sphereFlangeR.rotation.x += -0.001;
        sphereFlangeR.rotation.y += -0.002;
        
        sphere.scale.x = sphere.scale.y = (data[amplitude] * .005) + 0.5;
        drumSphere1.scale.x = sphere.scale.y = (drums[amplitude] * .005) + 0.5;
        drumSphere2.scale.x = sphere.scale.y = (drums[amplitude] * .005) + 0.5;
        sphereFlangeL.scale.x = sphereFlangeL.scale.y = (flangeL[amplitude] * .005) + 0.5;
        sphereFlangeR.scale.x = sphereFlangeR.scale.y = (flangeR[amplitude] * .005) + 0.5;
        
        renderer.render(scene, camera);
        
    }
    document.getElementById("song").play();
    animate();
    
});