"use client"

import RecipeForm from "@/components/recipe-form";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const HomePage = ({ }: Props) => {
  const router = useRouter()

  return (
    <section
      className="relative h-full w-full bg-gradient-to-r from-green-100 via-blue-200 to-purple-400 inset-0 overflow-auto"
    >
      <div
        className=" grid grid-cols-2 gap-2 p-10 h-full w-full"
      >
        <div className="w-full h-full flex flex-col justify-center items-center gap-5">
          <h1 className=" w-2/3 text-3xl font-extrabold text-black sm:text-5xl text-left">
            Subha roj
            <strong className="block font-extrabold text-primary">Aaj Kya Banana Hai. </strong>
          </h1>

          <p className=" text-muted-foreground text-md text-left w-2/3">
            ek naya sawal hai, jo har din ke khane ko ek naya aur romanchak anubhav banata hai.
          </p>
          <div className=" w-2/3 flex justify-start gap-5">
            <UserButton />
            <Button
              className=" flex gap-2"
              onClick={() => router.push("/recipe")}
            >
              Previous recipe&apos;s
              <ArrowRight className=" size-5" />
            </Button>
          </div>
        </div>
        <RecipeForm />
      </div>
    </section>
  );
};

export default HomePage;
