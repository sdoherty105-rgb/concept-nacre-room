import Link from "next/link";
import { ContentsMenu } from "./ContentsMenu";

export function Mast() {
  return (
    <>
      <div id="top" />
      <header className="mast">
        <Link href="/" className="wordmark">
          Nacre
        </Link>
        <ContentsMenu />
        <Link href="/reserve" className="reserve-link">
          Reserve
        </Link>
      </header>
    </>
  );
}
