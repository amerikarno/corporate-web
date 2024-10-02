import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "@/redux/Action";
import store from "@/redux/store";
import { Collapsis } from "@/components/collapse/collapse";
import {
  dataAll,
  dataForHot,
  dataForRecomended,
} from "./__mock__/mockCustomCardData";
import getImages from "@/common/imagesData";
import { getCookies, removeCookies } from "@/lib/cookies";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import example from "@assets/drawIcon/example.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IcoListItem } from "@/components/icoListItem";

interface datatype {
  ThemeChanger: any;
}

const Landing = ({ ThemeChanger }: datatype) => {
  const navigate = useNavigate();
  const token = getCookies();

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

  // function handleClick() {
  //   const theme = store.getState();
  //   ThemeChanger({ ...theme, toggled: "close", dataNavLayout: "horizontal" });
  // }

  const handleLogout = () => {
    localStorage.clear();
    removeCookies();
    navigate("/");
  };

  return (
    <>
      <div className="w-full">
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
                  Elite Consulting
                </p>
              </div>

              {token ? (
                <div className="w-1/2 s3:w-1/3 flex justify-end">
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
                          navigate("/dashboard/personal");
                        }}
                      >
                        Personal
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-300 hover:font-bold"
                        onClick={() => {
                          navigate("/order-trade");
                        }}
                      >
                        Invest
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
                        onClick={() => {
                          navigate("/deposite-withdraw");
                        }}
                      >
                        Deposite / Withdraw
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
        <div id="content" className="w-full space-y-6">
          <IcoListItem data={dataForHot} title="Hot" />
          <IcoListItem data={dataForRecomended} title="Recomended" />
          <IcoListItem data={dataAll} title="All" />
        </div>
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
                    <u className="text-lg text-white ">Elite Consulting</u>
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
                          info@admin.com
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
                            <Link to="#home">หน้าหลัก</Link>
                          </li>
                          <li>
                            <Link to="/dashboards/stocks/">ซื้อ/ขาย</Link>
                          </li>
                          <li>
                            <Link to="#services">ธุรกิจและบริการ</Link>
                          </li>
                          <li>
                            <Link to="#">เปิดบัญชี/ฝาก-ถอน</Link>
                          </li>
                          <li>
                            <Link to="#features">บริการอิเล็กทรอนิกส์</Link>
                          </li>
                          <li>
                            <Link to="#about">โปรโมชั่น</Link>
                          </li>
                          <li>
                            <Link to="#">ดาวน์โหลด</Link>
                          </li>
                          <li>
                            <Link to="#contact">ติดต่อเรา</Link>
                          </li>
                          <li>
                            <Link to="#faq">คำถามพบบ่อย</Link>
                          </li>
                          <li>
                            <Link to="#blogs">คอมมูนิตี้</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col space-y-3 px-4">
                        <ul className="text-gray-400 dark:text-gray-400 space-y-3">
                          <li>
                            <Link to="#our-mission">ปณิธานการดำเนินธุรกิจ</Link>
                          </li>
                          <li>
                            <Link to="#">โครงสร้างองค์กร</Link>
                          </li>
                          <li>
                            <Link to="#team">คณะกรรมการบริษัท</Link>
                          </li>
                          <li>
                            <Link to="#statistics">งบการเงิน</Link>
                          </li>
                          <li>
                            <Link to="#testimonials">
                              ประกาศและประชาสัมพันธ์
                            </Link>
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
                Elite Consulting
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
