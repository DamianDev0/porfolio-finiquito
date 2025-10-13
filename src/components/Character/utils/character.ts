import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  onProgress?: (value: number) => void
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );

        const blob = new Blob([encryptedBlob]);
        const blobUrl = URL.createObjectURL(blob);

        let character: THREE.Object3D;
        const isMesh = (object: THREE.Object3D): object is THREE.Mesh => {
          return (object as THREE.Mesh).isMesh === true;
        };

        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            character.traverse((child: THREE.Object3D) => {
              if (isMesh(child)) {
                const mesh = child;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            onProgress?.(96);
            resolve(gltf);

            character.getObjectByName("footR")!.position.y = 3.36;
            character.getObjectByName("footL")!.position.y = 3.36;

            URL.revokeObjectURL(blobUrl);
            dracoLoader.dispose();
          },
          (event) => {
            if (event.total > 0) {
              const value = Math.min(90, (event.loaded / event.total) * 90);
              onProgress?.(Math.round(value));
            } else {
              onProgress?.(60);
            }
          },
          (error) => {
            console.error("Error loading GLTF model:", error);
            URL.revokeObjectURL(blobUrl);
            reject(error);
          }
        );
      } catch (error) {
        reject(error);
        console.error(error);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
