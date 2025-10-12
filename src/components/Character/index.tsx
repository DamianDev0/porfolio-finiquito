import { useEffect } from "react";
import { useLoading } from "@/contexts/LoadingProvider";

const CharacterModel = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Simulate loading process without 3D model
    const simulateLoading = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random increment between 5-20%
        
        if (progress >= 100) {
          progress = 100;
          setLoading(100);
          clearInterval(interval);
        } else {
          setLoading(Math.floor(progress));
        }
      }, 200 + Math.random() * 300); // Random delay between 200-500ms
    };

    // Start loading simulation after a brief delay
    const timeout = setTimeout(simulateLoading, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [setLoading]);

  // Don't render anything - just handle the loading logic
  return null;
};

export default CharacterModel;
