"use client";

import RecipeForm from "@/components/recipe-form";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const HomePage = ({}: Props) => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-r from-green-100 via-blue-200 to-purple-400 inset-0 overflow-auto ">
      <div className=" grid md:grid-cols-2 lg:grid-cols-2 gap-5 py-10 px-5 md:p-10 lg:p-10 min-h-screen w-full">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full md:w-2/3 lg:w-2/3 flex flex-col gap-5">
            <h1 className=" text-3xl font-extrabold text-black sm:text-5xl text-left">
              Subha roj
              <strong className="block font-extrabold text-primary">
                Aaj Kya Banana Hai.{" "}
              </strong>
            </h1>
            <p className=" text-muted-foreground text-md text-left px-5  md:px-0 lg:px-0 ">
              Ek naya sawal hai, jo har din ke khane ko ek naya aur romanchak
              anubhav banata hai.
            </p>

            <div className="flex px-5 md:px-0 lg:px-0 justify-start gap-5">
              <UserButton />
              <Button
                className=" flex gap-2"
                onClick={() => router.push("/recipe")}>
                Previous recipe&apos;s
                <ArrowRight className=" size-5" />
              </Button>
            </div>
          </div>
        </div>
        <RecipeForm />
      </div>
    </section>
  );
};

export default HomePage;
