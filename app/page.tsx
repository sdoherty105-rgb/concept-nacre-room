import { preload } from "react-dom";
import { HomeIssue } from "@/components/HomeIssue";

export default function HomePage() {
  preload("/media/cover-864.avif", {
    as: "image",
    fetchPriority: "high",
    type: "image/avif",
    imageSrcSet: "/media/cover-800.avif 800w, /media/cover-864.avif 864w",
    imageSizes: "(max-width: 959px) 100vw, 42vw",
  });
  return <HomeIssue />;
}
