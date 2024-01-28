"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'

 function UserDropdown() {
  const router = useRouter();
  let user = useStore.getState().user.email
  let letter = user.charAt(0).toUpperCase();

  const handleSignOut = () => {
    // Clear local storage
    localStorage.clear();
    useStore.getState().startLogout();

  Cookies.remove('accessToken');
  router.push('/login');
   
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/MarazzaM.png" />
            <AvatarFallback>{letter}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground ">
            {user}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
        <button className="w-full h-full p-2" onClick={handleSignOut}>Sign Out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserDropdown;
