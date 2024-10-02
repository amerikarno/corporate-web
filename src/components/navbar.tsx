import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "@/redux/Action";
import store from "@/redux/store";
import getImages from "@/common/imagesData";
import { Helmet } from "react-helmet-async";
import { getCookies, removeCookies } from "@/lib/cookies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import example from "@assets/drawIcon/example.png";
import { Button } from "@/components/ui/Button";

interface datatype {
  ThemeChanger: any;
  children: React.ReactNode;
  isFullWidth?: boolean;
}

const NavBar = ({ ThemeChanger, children, isFullWidth }: datatype) => {
  const token = getCookies();
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 992) {
        const theme = store.getState();
        ThemeChanger({
          ...theme,
          toggled: "close",
          dataNavLayout: "horizontal",
        });
      } else {
        const theme = store.getState();
        ThemeChanger({
          ...theme,
          toggled: "open",
          dataNavLayout: "horizontal",
        });
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    removeCookies();
    navigate("/");
  };

  // function toggleNavigation() {
  //   if (window.innerWidth <= 992) {
  //     const theme = store.getState();
  //     ThemeChanger({ ...theme, toggled: "open", dataNavLayout: "horizontal" });
  //   }
  // }

  //   function handleClick() {
  //     const theme = store.getState();
  //     ThemeChanger({ ...theme, toggled: "close", dataNavLayout: "horizontal" });
  //   }

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en",
          "data-menu-styles": "dark",
          dir: "ltr",
          class: "light",
          "data-nav-layout": "horizontal",
          "data-header-styles": "light",
          "data-vertical-style": "overlay",
        }}
      />

      <div id="header" className="border-b border-gray-300 shadow-sm">
        <div
          className={`w-full ${
            isFullWidth ? "px-2" : "lg:max-w-[1240px]"
          } mx-auto`}
        >
          <div className="w-full flex flex-row py-4">
            <div className="w-1/2 items-center lg:w-1/3">
              <img
                src={getImages("logo")}
                alt=""
                className="h-12 hover:cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="hidden lg:block lg:w-1/3 lg:items-center">
              <p className="bg-gradient-to-r from-gold-light via-gold-mid to-gold-dark text-transparent bg-clip-text s2:text-3xl font-bold text-center">
                Elite Consulting
              </p>
            </div>
            {token ? (
              <div className="w-1/2 lg:w-1/3 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex space-x-2 outline-none">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={example} alt="" />
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
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
                      onClick={() => {
                        navigate("/dashboard/personal");
                      }}
                    >
                      Personal
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
                      onClick={() => {
                        navigate("/order-trade");
                      }}
                    >
                      Invest
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-300 hover:font-bold w-[200px]"
                      onClick={() => {
                        navigate("/");
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
                      onClick={() => handleLogout()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="w-1/2 s3:w-1/3 flex justify-end items-center space-x-4">
                <Button
                  className="bg-[rgba(90,102,241,1)] min-w-24 max-w-24"
                  onClick={() => navigate("/authentication/signup/type/")}
                >
                  Sign Up
                </Button>
                <Button
                  className="min-w-24 max-w-24 bg-slate-900"
                  onClick={() => navigate("/authentication/login")}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {children}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(NavBar);
