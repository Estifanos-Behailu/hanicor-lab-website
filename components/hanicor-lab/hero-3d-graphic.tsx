"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Hero3DGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    model: THREE.Group | null;
    controls: OrbitControls | null;
    cleanup: () => void;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Add very bright lights to ensure visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight1.position.set(10, 10, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight2.position.set(-10, -10, -5);
    scene.add(directionalLight2);

    // Mouse interaction variables
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const baseRotation = { x: 0.2, y: 0 };

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized coordinates (-1 to 1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Calculate target rotations based on mouse position
      targetRotation.y = baseRotation.y + mouse.x * 0.5;
      targetRotation.x = baseRotation.x - mouse.y * 0.3;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Load model with extensive debugging
    const loader = new GLTFLoader();
    console.log("🤖 Starting to load robot model from /images/robo.glb");
    
    loader.load(
      "/images/robo.glb",
      (gltf: GLTF) => {
        console.log("✅ Robot model loaded successfully!");
        
        const model = gltf.scene;
        
        // Get bounding box info
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        console.log("Original model size:", size);
        
        // Center the model
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Scale to a good visible size based on screen size
        const maxDimension = Math.max(size.x, size.y, size.z);
        let scale = 3;
        if (window.innerWidth < 640) {
          scale = 4.5; // Mobile
        } else if (window.innerWidth < 1024) {
          scale = 3.5; // Tablet
        } else {
          scale = 3; // Desktop
        }
        
        if (maxDimension > 0) {
          scale = scale / maxDimension;
        }
        
        model.scale.setScalar(scale);
        console.log("Applied scale factor:", scale);
        
        // Position at origin
        model.position.set(0, 0, 0);
        
        // Set initial rotation
        model.rotation.x = baseRotation.x;
        model.rotation.y = baseRotation.y;
        
        // Traverse and fix all meshes
        let meshCount = 0;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshCount++;
            child.visible = true;
            child.frustumCulled = false;
            
            // Ensure material exists and is visible
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => {
                  if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshBasicMaterial) {
                    mat.transparent = false;
                    mat.opacity = 1;
                    mat.visible = true;
                  }
                });
              } else {
                if (child.material instanceof THREE.MeshStandardMaterial || child.material instanceof THREE.MeshBasicMaterial) {
                  child.material.transparent = false;
                  child.material.opacity = 1;
                  child.material.visible = true;
                }
              }
            } else {
              child.material = new THREE.MeshBasicMaterial({ 
                color: 0x00E5FF,
                wireframe: false,
                transparent: false,
                opacity: 1
              });
            }
          }
        });
        
        console.log(`Total meshes found: ${meshCount}`);
        
        // Add model to scene
        scene.add(model);
        console.log("✅ Robot model added to scene!");
        
        // Store reference
        if (sceneRef.current) {
          sceneRef.current.model = model;
        }
      },
      (progress) => {
        const percentage = (progress.loaded / progress.total * 100).toFixed(2);
        console.log(`📥 Loading progress: ${percentage}%`);
      },
      (error) => {
        console.error("❌ Error loading robot model:", error);
        
        // Create fallback robot
        const fallbackRobot = new THREE.Group();
        
        const headGeometry = new THREE.BoxGeometry(1, 1, 1);
        const headMaterial = new THREE.MeshBasicMaterial({ color: 0x00E5FF });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.set(0, 1.5, 0);
        fallbackRobot.add(head);
        
        const bodyGeometry = new THREE.BoxGeometry(1.2, 2, 0.8);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0088FF });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0, 0, 0);
        fallbackRobot.add(body);
        
        const armGeometry = new THREE.BoxGeometry(0.3, 1.5, 0.3);
        const armMaterial = new THREE.MeshBasicMaterial({ color: 0x0066CC });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.8, 0.5, 0);
        fallbackRobot.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.8, 0.5, 0);
        fallbackRobot.add(rightArm);
        
        // Set initial rotation for fallback too
        fallbackRobot.rotation.x = baseRotation.x;
        fallbackRobot.rotation.y = baseRotation.y;
        
        scene.add(fallbackRobot);
        
        if (sceneRef.current) {
          sceneRef.current.model = fallbackRobot;
        }
        
        console.log("✅ Fallback robot created and added to scene");
      }
    );

    // Remove OrbitControls to allow pure mouse interaction
    // const controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop with smooth mouse tracking and floating
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const model = sceneRef.current?.model;
      if (model) {
        const time = clock.getElapsedTime();
        
        // Smooth rotation towards mouse position (like the original)
        const rotationSpeed = 0.1;
        model.rotation.x += (targetRotation.x - model.rotation.x) * rotationSpeed;
        model.rotation.y += (targetRotation.y - model.rotation.y) * rotationSpeed;
        
        // Floating animation (more pronounced)
        const baseY = 0;
        model.position.y = baseY + Math.sin(time * 1.5) * 0.1; // Increased amplitude
        
        // Optional: slight breathing/scaling effect
        const breatheScale = 1 + Math.sin(time * 2) * 0.02;
        model.scale.multiplyScalar(breatheScale);
        model.scale.divideScalar(breatheScale); // Reset for next frame
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Adjust model scale based on new screen size
      const model = sceneRef.current?.model;
      if (model) {
        let newScale = 3;
        if (window.innerWidth < 640) {
          newScale = 4.5;
        } else if (window.innerWidth < 1024) {
          newScale = 3.5;
        } else {
          newScale = 3;
        }
        
        // Apply the scale adjustment
        const currentScale = model.scale.x;
        const scaleRatio = newScale / currentScale;
        model.scale.multiplyScalar(scaleRatio);
      }
    };

    window.addEventListener("resize", handleResize);

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      model: null,
      controls: null,
      cleanup: () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationFrameId);
        containerRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };

    return () => {
      if (sceneRef.current) {
        sceneRef.current.cleanup();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 opacity-50 pointer-events-none"
      style={{ 
        background: 'transparent',
        minHeight: '100vh',
        width: '100%'
      }}
    />
  );
}
