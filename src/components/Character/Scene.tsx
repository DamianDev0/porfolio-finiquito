"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

import { useLoading } from "@/contexts/LoadingProvider";

const Scene: React.FC = () => {
  const canvasDiv = useRef<HTMLDivElement>(null!);
  const hoverDivRef = useRef<HTMLDivElement>(null!);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasDiv.current) return;

    // --- Inicialización de escena ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const rect = canvasDiv.current.getBoundingClientRect();
    const container = { width: rect.width, height: rect.height };
    const aspect = container.width / container.height;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.width, container.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    canvasDiv.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const clock = new THREE.Clock();
    const light = setLighting(scene);
    const { loadCharacter } = setCharacter(renderer, scene, camera);

    let headBone: THREE.Object3D | null = null;
    let screenLight: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    // Set initial loading progress
    setLoading(10);

    // --- Cargar personaje ---
    loadCharacter((progress) => {
      setLoading(progress);
    })
      .then((gltf) => {
        if (gltf) {
          setLoading(50); // Model loaded, now setting up animations
          
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) animations.hover(gltf, hoverDivRef.current);

          mixer = animations.mixer;
          const loadedCharacter = gltf.scene;
          setChar(loadedCharacter);
          scene.add(loadedCharacter);

          headBone = loadedCharacter.getObjectByName("spine006") || null;
          screenLight = loadedCharacter.getObjectByName("screenlight") || null;

          setLoading(80); // Animations set up
          
          setTimeout(() => {
            setLoading(90); // About to finish
            light.turnOnLights();
            animations.startIntro();
            
            setTimeout(() => {
              setLoading(100); // Everything completed
            }, 500);
          }, 1000);

          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, loadedCharacter)
          );
        }
      })
      .catch((error) => {
        console.error("Failed to load character:", error);
        // Even if model loading fails, complete the loading to prevent infinite loading
        setTimeout(() => {
          setLoading(100);
        }, 2000);
      });

    // --- Movimiento ---
    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };
    let debounce: number | undefined;

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => (mouse = { x, y }));
    };

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement;
      debounce = window.setTimeout(() => {
        element?.addEventListener("touchmove", (e: TouchEvent) =>
          handleTouchMove(e, (x, y) => (mouse = { x, y }))
        );
      }, 200);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, ix, iy) => {
        mouse = { x, y };
        interpolation = { x: ix, y: iy };
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    const landingDiv = document.getElementById("landingDiv");
    if (landingDiv) {
      landingDiv.addEventListener("touchstart", onTouchStart);
      landingDiv.addEventListener("touchend", onTouchEnd);
    }

    // --- Animación principal ---
    const animate = () => {
      requestAnimationFrame(animate);
      if (headBone) {
        handleHeadRotation(
          headBone,
          mouse.x,
          mouse.y,
          interpolation.x,
          interpolation.y,
          THREE.MathUtils.lerp
        );
        light.setPointLight(screenLight);
      }
      const delta = clock.getDelta();
      mixer?.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    // --- Limpieza ---
    return () => {
      clearTimeout(debounce);
      scene.clear();
      renderer.dispose();

      window.removeEventListener("resize", () =>
        handleResize(renderer, camera, canvasDiv, character!)
      );
      document.removeEventListener("mousemove", onMouseMove);

      if (landingDiv) {
        landingDiv.removeEventListener("touchstart", onTouchStart);
        landingDiv.removeEventListener("touchend", onTouchEnd);
      }
      if (canvasDiv.current) {
        canvasDiv.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
        <div className="character-hover" ref={hoverDivRef}></div>
      </div>
    </div>
  );
};

export default Scene;
