import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { login } from "@/lib/auth.action";
import Image from "next/image";

type Props = {};

const AuthForm = ({}: Props) => {
  return (
    <Card className=" p-8 shadow-xl">
      <CardHeader className=" justify-center items-center">
        <CardTitle className=" text-lg font-bold">
          Get Started to Kya Banana Hai
        </CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="px-1">
        <Button
          className="h-9 bg-white  border bg-card shadow-md w-full  font-semibold text-muted-foreground flex gap-2 hover:bg-slate-100 rounded-sm"
          onClick={async () => login()}>
          <Image src="/google.svg" alt="Google" height={20} width={20} />
          Continue with Google
        </Button>
      </CardContent>
      <CardFooter className=" text-xs text-muted-foreground flex justify-center font-semibold items-center">
        Secured by hitesh-s0lanki
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
