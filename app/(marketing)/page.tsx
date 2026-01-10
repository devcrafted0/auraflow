import { Medal } from "lucide-react";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

const headingFont = localFont({
  src: "../../public/font/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className={cn(
          "flex justify-center items-center flex-col",
          headingFont.className
        )}
      >
        <div className="flex p-4 rounded-full bg-amber-100 text-amber-700 uppercase shadow-sm border mb-4">
          <Medal className="w-6 h-6 mr-2" />
          No 1 Task management app
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-n`eutral-800 mb-6">
          Auraflow helps team move
        </h1>
        <div className="text-3xl md:text-6xl text-center bg-linear-to-r from-fuchsia-600 to-pink-600 text-white px-4 rounded-md w-fit pb-4">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Auraflow.
      </div>
      <Button className="mt-6" size="lg">
        <Link href="/sign-up">Get Auraflow for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
