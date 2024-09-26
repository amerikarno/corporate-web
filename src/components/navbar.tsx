import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

interface datatype {
  ThemeChanger: any;
}

const NavBar = ({ ThemeChanger }: datatype) => {
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

      <div className="w-full border-b border-gray-300 lg:block">
        <div className="container mx-auto lg:p-6 !p-0">
          {/* <div className="container mx-auto lg:p-6 !p-0"> */}
          <div className="py-6">
            {/* <div className="main-sidebar"> */}
            <nav className="flex flex-row justify-between">
              {/* <nav className="main-menu-container nav nav-pills sub-open"> */}
              <div className="landing-logo-container my-auto hidden md:block">
                <div className="responsive-logo">
                  <div className="flex flex-row items-center space-x-6 ">
                    <img src={getImages("logo")} alt="" className="h-16" />
                    <h1 className="text-3xl font-bold">Elite Consulting</h1>
                  </div>
                </div>
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
                <div className="lg:flex space-x-6 rtl:space-x-reverse items-center pl-4">
                  <Link
                    to={`${
                      import.meta.env.BASE_URL
                    }authentication/signup/type/`}
                    className="ti-btn w-[6.375rem] ti-btn-dark m-0 p-2 h-12"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to={`${import.meta.env.BASE_URL}authentication/login`}
                    className="ti-btn w-[6.375rem] m-0 p-2 ti-btn-primary h-12"
                  >
                    Login
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(NavBar);
