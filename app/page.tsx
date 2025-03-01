import {Button} from "@/components/ui/button";
import {ArrowLeftCircle} from "lucide-react";

export default function Home() {
  return (
    <div className="">
        <main className="flex space-x-2 items-center animate-pulse">
            <ArrowLeftCircle className={"w-12 h-12"}></ArrowLeftCircle>
            <h1 className={"font-bold "}>Getting start with create a new document</h1>
      </main>
    </div>
  );
}
