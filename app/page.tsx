import { Hero } from "@/components/Hero";
import { PlannerIsland } from "@/components/PlannerIsland";
import { ServicesMenu } from "@/components/ServicesMenu";
import { Space } from "@/components/Space";
import { Stylists } from "@/components/Stylists";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesMenu />
      <PlannerIsland />
      <Space />
      <Stylists />
      <Visit />
    </>
  );
}

