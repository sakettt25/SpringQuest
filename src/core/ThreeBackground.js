export class ThreeBackground {
  constructor() {
    this.container = document.getElementById('webgl-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'webgl-container';
      this.container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;opacity:0.6;pointer-events:none;';
      document.body.prepend(this.container);
    }
    
    // Fallback if Three is not loaded
    if (typeof THREE === 'undefined') {
      console.warn("Three.js not found.");
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.camera.position.z = 30;
    this.camera.position.y = 10;
    this.camera.lookAt(0, 0, 0);

    // Create a sleek wireframe terrain/grid
    const geometry = new THREE.PlaneGeometry(200, 100, 40, 20);
    geometry.rotateX(-Math.PI / 2);

    // Add some noise to the vertices to make it look like terrain
    const positionAttribute = geometry.attributes.position;
    for ( let i = 0; i < positionAttribute.count; i ++ ) {
      const x = positionAttribute.getX(i);
      const z = positionAttribute.getZ(i);
      const y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 3 + Math.sin(x * 0.05) * 5;
      positionAttribute.setY(i, y);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6, 
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.position.y = -10;
    this.scene.add(this.terrain);
    
    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.4
    });
    this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particlesMesh);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    this.clock = new THREE.Clock();
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    const elapsedTime = this.clock.getElapsedTime();

    // Slowly move the terrain
    this.terrain.position.z = (elapsedTime * 2) % 5;
    
    // Slowly rotate particles
    this.particlesMesh.rotation.y = elapsedTime * 0.05;
    this.particlesMesh.rotation.x = elapsedTime * 0.02;

    this.renderer.render(this.scene, this.camera);
  }
}
