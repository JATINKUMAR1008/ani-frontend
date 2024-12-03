import { BellIcon, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link } from "@tanstack/react-router";

export const Navbar = () => {
  return (
    <div className="w-full h-[50px] border-b border-separate flex items-center justify-between p-2">
      <div className="flex items-center gap-2 w-full pl-4">
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full  flex items-center justify-center md:hidden"
        >
          <MenuIcon size={16} />
        </Button>
        <Link href="/">
          <h1 className="text-lg">
            <span className="font-semibold">Hikari</span>
            <span className="text-accent-foreground font-thin ml-1">HUB</span>
          </h1>
        </Link>
        <div className="w-full md:basis-1/4 basis-1/2  ml-5">
          <Input className="my-auto h-[80%]" placeholder="Search..." />
        </div>
      </div>
      <div className="md:flex items-center gap-2">
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full hidden md:flex items-center justify-center"
        >
          <BellIcon size={16} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full hidden sm:flex"
        >
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </div>
  );
};
