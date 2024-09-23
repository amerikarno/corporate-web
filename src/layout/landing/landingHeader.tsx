import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "@/redux/Action";
import store from "@/redux/store";
import getImages from "@/common/imagesData";
import { Helmet } from "react-helmet-async";

interface datatype {
  ThemeChanger: any;
  children: React.ReactNode;
}

const LandingHeader = ({ ThemeChanger, children }: datatype) => {
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
        <div className="container mx-auto lg:p-6 !p-0">
          <div className="main-sidebar">
            <nav className="main-menu-container nav nav-pills sub-open">
              <div className="landing-logo-container my-auto hidden lg:block">
                <div className="responsive-logo">
                  <div className="flex flex-row items-center space-x-4">
                    <img src={getImages("logo2")} alt="" className="w-[40px]" />
                    <h1 className="text-2xl font-bold">Digital Asset</h1>
                  </div>
                </div>
              </div>

              <div className="lg:flex hidden space-x-2 rtl:space-x-reverse">
                <Link
                  to={`${
                    import.meta.env.BASE_URL
                  }authentication/signup/type/`}
                  className="ti-btn w-[6.375rem] ti-btn-dark m-0 p-2"
                >
                  Sign Up
                </Link>
                <Link
                  to={`${import.meta.env.BASE_URL}authentication/login`}
                  className="ti-btn w-[6.375rem] m-0 p-2 ti-btn-primary"
                >
                  Login
                </Link>
              </div>
            </nav>
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

export default connect(mapStateToProps, { ThemeChanger })(LandingHeader);
