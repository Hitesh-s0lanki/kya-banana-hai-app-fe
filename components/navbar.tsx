"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className=" border shadow py-3 px-6 flex items-center ">
      <Button className="px-2" variant={"ghost"} asChild>
        <Link href={"/"}>
          <ChevronLeft className="size-6" />
        </Link>
      </Button>
      <h1 className=" text-xl font-semibold">Aaj aae Banana Hai</h1>
    </div>
  );
};

export default Navbar;
