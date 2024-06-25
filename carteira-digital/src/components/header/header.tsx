import { Logo } from "./logo/logo";
import { CiWallet } from "react-icons/ci";
import { BsHouse } from "react-icons/bs";
import { ActiveLink } from "./active-link/active-link";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between p-10">
        <div>
          <Logo />
        </div>
        <nav className="flex gap-x-10 mx-10 font-extrabold text-lg">
          <ActiveLink href="/">
            {" "}
            <BsHouse className="mr-2" />
            Home
          </ActiveLink>

          <ActiveLink href="/wallet">
            {" "}
            <CiWallet size={24} className="mr-2" />
            Sua carteira
          </ActiveLink>
        </nav>
      </header>
    </>
  );
}
