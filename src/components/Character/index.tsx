import { useEffect } from "react";

import { useLoading } from "@/contexts/LoadingProvider";

const CharacterModel = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Ensure the loading overlay is dismissed even without the 3D scene.
    setLoading(100);
  }, [setLoading]);

  return null;
};

export default CharacterModel;
