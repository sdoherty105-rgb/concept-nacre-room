import { Hero } from "@/components/Hero";
import { LazyPlannerIsland } from "@/components/LazyPlannerIsland";
import { ServicesMenu } from "@/components/ServicesMenu";
import { Space } from "@/components/Space";
import { Stylists } from "@/components/Stylists";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesMenu />
      <LazyPlannerIsland />
      <Space />
      <Stylists />
      <Visit />
    </>
  );
}
