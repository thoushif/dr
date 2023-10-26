import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold">
      <Link href="/">
        <Image
          className="-ml-5"
          width={200}
          height={200}
          src="/logo.gif"
          alt="Logo"
        />
      </Link>
    </header>
  );
}

export default Header;
