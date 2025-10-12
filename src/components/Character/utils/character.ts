import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";

import { decryptFile } from "./decrypt";
import { setAllTimeline, setCharTimeline } from "@/utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = (onProgress?: (progress: number) => void) => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        onProgress?.(20); // Starting decryption
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        onProgress?.(30); // Decryption complete
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            onProgress?.(40); // Model loaded, compiling
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            onProgress?.(45); // Setting up animations
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
            resolve(gltf);
          },
          (progress) => {
            // GLTF loading progress
            if (progress.total > 0) {
              const percent = Math.min(30 + (progress.loaded / progress.total) * 10, 40);
              onProgress?.(percent);
            }
          },
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
