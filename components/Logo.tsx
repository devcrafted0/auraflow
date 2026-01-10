import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const headingFont = localFont({
  src: "../public/font/font.woff2",
});

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition gap-x-2 hidden md:flex items-center">
        <Image src="/logo.svg" alt="logo" width={25} height={25} />
        <p
          className={cn("text-lg text-neutral-700", headingFont.className)}
        >
          Auraflow
        </p>
      </div>
    </Link>
  );
};

export default Logo;
