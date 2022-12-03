import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function SpaceSphereScene () {
  const canvas = useRef();

  useEffect(() => {
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

    camera.position.x = 1
    camera.position.y = 1
    camera.position.z = 2
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({canvas: canvas.current});
    renderer.setSize( sizes.width, sizes.height );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const tick = () => {
      controls.update();

      renderer.render(scene, camera);

      window.requestAnimationFrame(tick);
    };
    
    window.addEventListener('resize', () =>
    {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
    
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    });

    const geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;

    const controls = new OrbitControls(camera, canvas.current);
    controls.enableDamping = true;

    renderer.render( scene, camera );

    tick();
  });

  return (
    <canvas ref={canvas}></canvas>
  );
};