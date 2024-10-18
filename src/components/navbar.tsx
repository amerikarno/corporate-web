import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "@/redux/Action";
import store from "@/redux/store";
import getImages from "@/common/imagesData";
import { getCookies, removeCookies } from "@/lib/cookies";
import example from "@assets/drawIcon/example.png";
import { Button } from "@/components/ui/Button";
import { MenuForDropdown } from "./menuForDropdown";

interface datatype {
  ThemeChanger: any;
  children: React.ReactNode;
  isFullWidth?: boolean;
  padding?: string;
}

const NavBar = ({ ThemeChanger, children, isFullWidth, padding }: datatype) => {
  const token = getCookies();
  const navigate = useNavigate();
  const [pad, setPad] = useState<string>("");

  useEffect(() => {
    if (padding) {
      setPad(padding);
    }
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

  return (
    <>
      <div id="header" className="border-b border-gray-300 shadow-sm">
        <div
          className={`w-full ${
            isFullWidth ? "px-2" : `px-2 md:${pad} lg:max-w-[1240px]`
          } mx-auto`}
        >
          <div className="w-full flex flex-row py-4">
            <div className="w-1/2 items-center lg:w-1/3">
              <img
                src={getImages("whiteBg")}
                alt=""
                className="h-12 hover:cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="hidden lg:block lg:w-1/3 lg:items-center justify-center">
              <p className="bg-gradient-to-r from-gold-light via-gold-mid to-gold-dark text-transparent bg-clip-text s2:text-3xl font-bold text-center">
                ICO Campaign Portal
              </p>
            </div>
            {token ? (
              <div className="w-1/2 lg:w-1/3 flex justify-end">
                <MenuForDropdown avatar={example} logout={handleLogout} />
              </div>
            ) : (
              <div className="w-1/2 lg:w-1/3 flex justify-end items-center space-x-4">
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
