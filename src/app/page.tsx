"use client";

import dynamic from "next/dynamic";

const MainContainer = dynamic(() => import("@/components/MainContainer"), {
  ssr: false,
});

const CharacterModel = dynamic(() => import("@/components/Character"), {
  ssr: false,
});

export default function ClientHome() {
  return (
    <MainContainer>
      <CharacterModel />
    </MainContainer>
  );
}
