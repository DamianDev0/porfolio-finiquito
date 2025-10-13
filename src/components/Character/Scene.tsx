"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useLoading } from "@/contexts/LoadingProvider";
import setCharacter from "./utils/character";
import setLighting, { ScreenLightMesh } from "./utils/lighting";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setProgress } = useLoading();

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) {
      return;
    }

    const { width, height } = container.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.className =
      "pointer-events-none relative z-[2] h-full w-full";
    container.appendChild(renderer.domElement);

    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
    camera.position.set(0, 13.1, 24.7);
    camera.zoom = 1.1;
    camera.updateProjectionMatrix();

    const scene = sceneRef.current;
    const light = setLighting(scene);

    let headBone: THREE.Object3D | null = null;
    let screenLight: ScreenLightMesh | null = null;
    let character: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;

    const clock = new THREE.Clock();

    setProgress((previous) => (previous < 20 ? 20 : previous));

    const { loadCharacter } = setCharacter(renderer, scene, camera, (value) => {
      setProgress((previous) => (previous < value ? value : previous));
    });

    const loadPromise = loadCharacter()
      .then((gltf) => {
        if (!gltf) {
          return;
        }

        const animations = setAnimations(gltf);
        if (hoverDivRef.current) {
          animations.hover(gltf, hoverDivRef.current);
        }

        mixer = animations.mixer;
        character = gltf.scene;
        scene.add(character);

        headBone = character.getObjectByName("spine006") || null;
        const screenLightCandidate = character.getObjectByName("screenlight");
        if (
          screenLightCandidate &&
          (screenLightCandidate as THREE.Mesh).isMesh &&
          (screenLightCandidate as THREE.Mesh).material instanceof
            THREE.MeshStandardMaterial
        ) {
          screenLight = screenLightCandidate as ScreenLightMesh;
        } else {
          screenLight = null;
        }

        setProgress((previous) => (previous < 96 ? 96 : previous));

        setTimeout(() => {
          light.turnOnLights();
          animations.startIntro();
          setProgress(100);
        }, 2500);
      })
      .catch((error) => {
        console.error("Error loading character", error);
        setProgress(100);
      });

    let mouse = { x: 0, y: 0 };
    let interpolation = { x: 0.1, y: 0.2 };

    const onMouseMove = (event: MouseEvent) => {
      handleMouseMove(event, (x, y) => {
        mouse = { x, y };
      });
    };

    let touchMoveTarget: HTMLElement | null = null;
    let touchMoveListener: ((event: TouchEvent) => void) | null = null;

    const onTouchStart = (event: TouchEvent) => {
      const element = event.target as HTMLElement | null;
      if (!element) {
        return;
      }

      touchMoveListener = (touchEvent: TouchEvent) => {
        handleTouchMove(touchEvent, (x, y) => {
          mouse = { x, y };
        });
      };

      touchMoveTarget = element;
      element.addEventListener("touchmove", touchMoveListener);
    };

    const onTouchEnd = () => {
      handleTouchEnd((x, y, interpolationX, interpolationY) => {
        mouse = { x, y };
        interpolation = { x: interpolationX, y: interpolationY };
      });

      if (touchMoveTarget && touchMoveListener) {
        touchMoveTarget.removeEventListener("touchmove", touchMoveListener);
      }

      touchMoveTarget = null;
      touchMoveListener = null;
    };

    document.addEventListener("mousemove", onMouseMove);
    const landingElement = document.getElementById("landingDiv");
    landingElement?.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });
    landingElement?.addEventListener("touchend", onTouchEnd);

    const onResize = () => {
      if (!character) {
        return;
      }

      handleResize(renderer, camera, canvasDiv, character);
    };

    window.addEventListener("resize", onResize);

    let animationFrame = 0;
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

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
      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousemove", onMouseMove);
      landingElement?.removeEventListener("touchstart", onTouchStart);
      landingElement?.removeEventListener("touchend", onTouchEnd);
      if (touchMoveTarget && touchMoveListener) {
        touchMoveTarget.removeEventListener("touchmove", touchMoveListener);
      }

      loadPromise.catch(() => undefined);

      scene.clear();
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [setProgress]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        ref={canvasDiv}
        className="character-model pointer-events-none absolute bottom-[50px] left-1/2 z-0 flex h-[80%] w-full max-h-[1080px] max-w-[1920px] -translate-x-1/2 transform-gpu items-center justify-center md:h-[80vh] before:absolute before:left-1/2 before:top-full before:h-[700px] before:w-screen before:-translate-x-1/2 before:bg-[var(--backgroundColor)] before:content-[''] after:absolute after:left-1/2 after:bottom-[-50px] after:h-[250px] after:w-screen after:-translate-x-1/2 after:bg-[linear-gradient(to_bottom,rgba(0,0,0,0),var(--backgroundColor)_70%)] after:content-['']"
      >
        <div className="character-rim pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 translate-y-[100%] scale-[1.4] rounded-full bg-[#f59bf8] opacity-0 blur-[50px] shadow-[inset_66px_35px_85px_0px_rgba(85,0,255,0.65)]"></div>
      </div>
      <div
        ref={hoverDivRef}
        className="character-hover pointer-events-auto absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      ></div>
    </div>
  );
};

export default Scene;
