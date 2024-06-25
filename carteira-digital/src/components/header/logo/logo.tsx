import Image from "next/image";
import Link from "next/link";
import { Alkatra } from "next/font/google";

const alkatra = Alkatra({ subsets: ["latin"], weight: "400" });

export function Logo() {
  return (
    <>
      <div>
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.svg"
            alt="Logotipo"
            width={100}
            height={100}
          />
          <h1 className={`${alkatra.className} text-2xl font-extrabold`}>CD</h1>
        </Link>
      </div>
    </>
  );
}
