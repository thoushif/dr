import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-5 space-x-2 font-bold">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            className="rounded-full"
            width={50}
            height={50}
            src="https://i.imgur.com/wdRhsSS.jpg"
            alt="Logo"
          />
        </Link>
        <h1>Dr Studio</h1>
      </div>
      <div>
        <Link
          href="/"
          className="flex items-center px-5 py-3 text-sm text-center text-white bg-gray-900 rounded-full md:text-base "
        >
          Sign Up to the improve
        </Link>
      </div>
    </header>
  );
}

export default Header;
