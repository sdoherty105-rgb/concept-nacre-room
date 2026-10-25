import { Hero } from "@/components/Hero";
import { ServicesMenu } from "@/components/ServicesMenu";
import { PlannerProvider } from "@/components/PlannerProvider";
import { Planner } from "@/components/Planner";
import { Space } from "@/components/Space";
import { Stylists } from "@/components/Stylists";
import { BookingForm } from "@/components/BookingForm";
import { Visit } from "@/components/Visit";

export default function Home() {
  return (
    <PlannerProvider>
      <Hero />
      <ServicesMenu />
      <Planner />
      <Space />
      <Stylists />
      <BookingForm />
      <Visit />
    </PlannerProvider>
  );
}
