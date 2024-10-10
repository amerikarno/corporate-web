import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

type TMenuForDropdown = {
  avatar: string;
  logout: () => void;
};
export function MenuForDropdown({ avatar, logout }: TMenuForDropdown) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex space-x-2 outline-none">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatar} alt="" />
          <AvatarFallback>
            <div className="rounded-full w-full h-full bg-white"></div>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-12 bg-white space-y-2">
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
          onClick={() => {
            navigate("/");
          }}
        >
          Profile
        </DropdownMenuItem>
        {/* <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
          onClick={() => {
            navigate("/dashboard/personal");
          }}
        >
          Personal
        </DropdownMenuItem> */}
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
          onClick={() => {
            navigate("/");
            // navigate("/invest");
          }}
        >
          Invest
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
          onClick={() => {
            navigate("/portfolio");
          }}
        >
          Portfolio
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
          onClick={() => {
            navigate("/deposite-withdraw");
          }}
        >
          Deposite / Withdraw
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
          onClick={() => logout()}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
