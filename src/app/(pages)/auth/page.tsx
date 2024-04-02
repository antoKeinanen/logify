import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GithubIcon } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            An account will be created for you automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button className="flex w-full gap-2 bg-black hover:bg-neutral-900">
            <GithubIcon /> Sign in with github
          </Button>
        </CardContent>
        <CardFooter>
          <CardDescription>
            By signing in you agree to our terms and conditions
          </CardDescription>
        </CardFooter>
      </Card>
    </main>
  );
}
