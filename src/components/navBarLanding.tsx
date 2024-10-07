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
}

const NavBarLanding = ({ ThemeChanger }: datatype) => {
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

      <div className="w-full border-b border-gray-300">
        <div className="max-w-[380px] md:max-w-screen-md xl:max-w-screen-xl mx-auto py-6 xl:px-4">
          <div className="">
            <div className="flex flex-row">
              <div className="w-1/2 lg:w-1/3">
                <img src={getImages("logo")} alt="" className="h-12 md:h-16" />
              </div>
              <div className="hidden xl:flex xl:w-1/3 items-center">
                <u className="xl:text-3xl font-bold text-black">
                  Finansia Digital Asset
                </u>
              </div>

              {token ? (
                <div className="lg:flex space-x-6 rtl:space-x-reverse items-center pl-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex pr-4 space-x-2 outline-none">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={example} alt="" />
                        <AvatarFallback>
                          <div className="rounded-full w-full h-full bg-white"></div>
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-12 bg-white space-y-2">
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-300 hover:font-bold"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-300 hover:font-bold"
                        onClick={() => {
                          navigate("/market");
                        }}
                      >
                        Market
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-300 hover:font-bold"
                        onClick={() => {
                          navigate("/order-trade");
                        }}
                      >
                        Buy / Sell
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-300 hover:font-bold"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Portfolio
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-300 hover:font-bold"
                        onClick={() => handleLogout()}
                      >
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="w-1/2 lg:w-1/3 flex justify-end space-x-6">
                  <Button
                    className="bg-[rgba(90,102,241,1)] min-w-12"
                    onClick={() => navigate("/authentication/signup/type/")}
                  >
                    Sign Up
                  </Button>
                  <Button
                    className="bg-gray-900 min-w-12"
                    onClick={() => navigate("/authentication/login")}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(NavBarLanding);
