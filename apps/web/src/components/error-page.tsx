import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ErrorPageProps {
  children?: React.ReactNode;
}

function ErrorPage({ children }: ErrorPageProps) {
  return (
    <main className=" flex w-full items-center justify-center pt-20 p-4">
      <Card className="max-w-[650px]">
        <CardHeader>
          <CardTitle>An error has ocurred</CardTitle>
          <CardDescription>
            Something unexpected has happened. Please try again later.
          </CardDescription>
          <CardContent className="pt-4 text-muted-foreground">
            {children}
          </CardContent>
          <CardFooter className="px-0">
            <a href="/">
              <Button className="w-full">Return to front page.</Button>
            </a>
          </CardFooter>
        </CardHeader>
      </Card>
    </main>
  );
}

export default ErrorPage;
