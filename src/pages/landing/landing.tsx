import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "@/redux/Action";
import store from "@/redux/store";
import { Collapsis } from "@/components/collapse/collapse";
import getImages from "@/common/imagesData";
import { getCookies, removeCookies } from "@/lib/cookies";
import { Button } from "@/components/ui/Button";
import example from "@assets/drawIcon/example.png";
import { IcoListItem } from "@/components/icoListItem";
import { MenuForDropdown } from "@/components/menuForDropdown";
import { IcoType } from "./types";
import { resetTitleFavIcon, getAllIcoData, getAppName } from "@/lib/utils";

interface datatype {
  ThemeChanger: any;
}

const Landing = ({ ThemeChanger }: datatype) => {
  resetTitleFavIcon();
  const navigate = useNavigate();
  const token = getCookies();
  const [icoData, setIcoData] = useState<IcoType | undefined>(undefined);

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

  const fetchIcoData = async () => {
    const data = await getAllIcoData();
    if (data) {
      setIcoData(data);
      store.dispatch({
        type: "setAllIcoStore",
        payload: data,
      });
    }
  };

  useEffect(() => {
    if (!icoData) {
      fetchIcoData();
    }
    localStorage.removeItem("asset");

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
      <div className="w-full h-full">
        <div id="header" className="border-b border-gray-300 shadow-sm">
          <div className="max-w-screen-s1 s2:max-w-[840px] s3:max-w-[1280px] mx-auto s3:px-2">
            <div className="w-full flex flex-row py-4 px-4">
              <div className="w-1/2 items-center s3:w-1/3">
                <img
                  src={getImages("logo")}
                  alt=""
                  className="h-12 hover:cursor-pointer"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="hidden s3:flex s3:w-1/3 s3:items-center">
                <p className="bg-gradient-to-r from-gold-light via-gold-mid to-gold-dark text-transparent bg-clip-text s2:text-3xl font-bold text-center">
                  {getAppName()}
                </p>
              </div>

              {token ? (
                <div className="w-1/2 s3:w-1/3 flex justify-end">
                  <MenuForDropdown avatar={example} logout={handleLogout} />
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
        {icoData ? (
          <div id="content" className="w-full space-y-6">
            {icoData.active && (
              <IcoListItem data={icoData.active} title="Active" />
            )}
            {icoData.upcoming && (
              <IcoListItem data={icoData.upcoming} title="Upcoming" />
            )}
            {icoData.ended && (
              <IcoListItem data={icoData.ended} title="Ended" />
            )}
          </div>
        ) : (
          <div className="w-full h-[400px] flex items-center justify-center">
            Loading ...
          </div>
        )}
        <footer id="footer" className="bg-dark-bg">
          <div className="border-b border-white/10  pb-8">
            <div className="container mx-auto pt-10">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-4">
                  <div className="space-y-4 px-4">
                    <img
                      src={getImages("logo")}
                      className="h-10 mb-2"
                      alt="img"
                    />
                    <u className="text-lg text-white ">{getAppName()}</u>
                    <p className="text-white text-xl font-bold pt-4">
                      Community
                    </p>
                    <div className="flex space-x-1 rtl:space-x-reverse">
                      <button
                        aria-label="button"
                        type="button"
                        className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 "
                      >
                        <i className="ri ri-github-line text-lg leading-none"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 "
                      >
                        <i className="ri ri-instagram-line text-lg leading-none"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 "
                      >
                        <i className="ri ri-twitter-line text-lg leading-none"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 "
                      >
                        <i className="ri ri-linkedin-line text-lg leading-none"></i>
                      </button>
                      <button
                        aria-label="button"
                        type="button"
                        className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 "
                      >
                        <i className="ri ri-google-line text-lg leading-none"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-3 px-4">
                      <ul className="space-y-3 text-gray-400 dark:text-gray-400">
                        <li>
                          <Link to="#">เกี่ยวกับบริษัท</Link>
                        </li>
                        <li>
                          <Link to="#">ปณิธานการดำเนินธุรกิจ</Link>
                        </li>
                        <li>
                          <Link to="#">โครงสร้างองค์กร</Link>
                        </li>
                        <li>
                          <Link to="#">คณะกรรมการบริษัท</Link>
                        </li>
                        <li>
                          <Link to="#">งบการเงิน</Link>
                        </li>
                        <li>
                          <Link to="#">ประกาศและประชาสัมพันธ์</Link>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3 px-4">
                      <ul className="space-y-3 text-gray-400 ">
                        <li>
                          <Link to="#">สมัครงาน</Link>
                        </li>
                        <li>
                          <Link to="#">ช่องทางการร้องเรียน</Link>
                        </li>
                        <li>
                          <Link to="#">นโยบายความเป็นส่วนตัวและเงื่อนไขฯ</Link>
                        </li>
                        <li>
                          <Link to="#">การเปิดเผยข้อมูลและความเสี่ยงฯ</Link>
                        </li>
                        <li>
                          <Link to="#">รายงานข้อมูลคุณภาพการให้บริการ</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <div className="space-y-3 px-4">
                    <div>
                      <h6 className="text-white text-xl leading-none font-bold">
                        Contact Us
                      </h6>
                      <hr className="w-10 border-t-4 border-primary inline-block mx-auto" />
                    </div>
                    <ul className="space-y-3 text-gray-400 ">
                      <li>
                        {" "}
                        <Link to="#" className="inline-flex">
                          <i className="text-white ri-home-8-line ltr:mr-2 rtl:ml-2 pr-1"></i>{" "}
                          xx/xx อาคาร xxx ชั้น xx ถนน xx แขวง xx เขต xx กรุงเทพ
                          1xxxx
                        </Link>{" "}
                      </li>
                      <li>
                        {" "}
                        <Link to="#" className="inline-flex">
                          <i className="text-white ri-mail-line ltr:mr-2 rtl:ml-2 pr-1"></i>
                          info@finansia-ico.com
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link to="#" className="inline-flex">
                          <i className="text-white ri-phone-line ltr:mr-2 rtl:ml-2 pr-1"></i>{" "}
                          xx xxx xxxx
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4"></div>
                <div className="col-span-12 md:col-span-4">
                  <Collapsis
                    label="แผนผังเวบไซต์"
                    className="text-gray-400 dark:text-gray-400 px-4"
                  >
                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-3 px-4">
                        <ul className="text-gray-400 dark:text-gray-400 space-y-3">
                          <li>
                            <Link to="#">หน้าหลัก</Link>
                          </li>
                          <li>
                            <Link to="#">ลงทุน</Link>
                          </li>
                          <li>
                            <Link to="#">ธุรกิจและบริการ</Link>
                          </li>
                          <li>
                            <Link to="#">เปิดบัญชี/ฝาก-ถอน</Link>
                          </li>
                          <li>
                            <Link to="#">บริการอิเล็กทรอนิกส์</Link>
                          </li>
                          <li>
                            <Link to="#">โปรโมชั่น</Link>
                          </li>
                          <li>
                            <Link to="#">ดาวน์โหลด</Link>
                          </li>
                          <li>
                            <Link to="#">ติดต่อเรา</Link>
                          </li>
                          <li>
                            <Link to="#">คำถามพบบ่อย</Link>
                          </li>
                          <li>
                            <Link to="#">คอมมูนิตี้</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col space-y-3 px-4">
                        <ul className="text-gray-400 dark:text-gray-400 space-y-3">
                          <li>
                            <Link to="#">ปณิธานการดำเนินธุรกิจ</Link>
                          </li>
                          <li>
                            <Link to="#">โครงสร้างองค์กร</Link>
                          </li>
                          <li>
                            <Link to="#">คณะกรรมการบริษัท</Link>
                          </li>
                          <li>
                            <Link to="#">งบการเงิน</Link>
                          </li>
                          <li>
                            <Link to="#">ประกาศและประชาสัมพันธ์</Link>
                          </li>
                          <li>
                            <Link to="#">สมัครงาน</Link>
                          </li>
                          <li>
                            <Link to="#">ช่องทางการร้องเรียน</Link>
                          </li>
                          <li>
                            <Link to="#">
                              นโยบายความเป็นส่วนตัวและเงื่อนไขฯ
                            </Link>
                          </li>
                          <li>
                            <Link to="#">การเปิดเผยข้อมูลและความเสี่ยงฯ</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Collapsis>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-white">
              Copyright © <span id="year">2024</span>{" "}
              <span
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="text-primary hover:cursor-pointer"
              >
                {getAppName()}
              </span>
            </p>
          </div>
          <div
            className="flex z-50 fixed bottom-5 right-5 px-2 rounded-lg hover:cursor-pointer py-1 bg-primary"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <span className="arrow">
              <i className="ri-arrow-up-s-fill text-xl text-white"></i>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Landing);
