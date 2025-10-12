import dynamic from "next/dynamic";

const MainContainer = dynamic(() => import("@/components/MainContainer"), {
  ssr: false,
});

export default function Home() {
  return <MainContainer />;
}
