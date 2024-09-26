import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "@/redux/Action";
import store from "@/redux/store";
import { Collapsis } from "@/components/collapse/collapse";
import { CustomCard } from "@/components/customCard";
import {
  dataAll,
  dataForHot,
  dataForRecomended,
} from "./__mock__/mockCustomCardData";

interface datatype {
  ThemeChanger: any;
}

const Landing = ({ ThemeChanger }: datatype) => {
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

  function handleClick() {
    const theme = store.getState();
    ThemeChanger({ ...theme, toggled: "close", dataNavLayout: "horizontal" });
  }

  return (
    <>
      <div className="landing-page-wrapper relative">
        <div className="main-content landing-main !p-0" onClick={handleClick}>
          <div className="py-10" id="hot tokens">
            <div className=" mx-auto space-y-6 ">
              <div className="flex flex-wrap justify-start max-w-screen-md md:max-w-screen-md xl:max-w-screen-xl mx-auto">
                <h2 className="text-3xl font-bold mx-auto">
                  Hot
                </h2>
              </div>
              {/* <ul className=" max-w[28rem] md:max-w[56rem] xl:max-w-[84rem]  grid place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-20 gap-x-5"> */}
              <ul className="flex flex-wrap max-w-screen-md xl:max-w-screen-xl justify-center md:justify-start md:mx-auto">
                {dataForHot.map((item, index) => (
                  <li
                    className="flex justify-center md:w-1/2 xl:w-1/3 py-5"
                    key={index}
                  >
                    <div
                      onClick={() =>
                        navigate(
                          `${import.meta.env.BASE_URL}asset/${index + 1}`
                        )
                      }
                    >
                      <CustomCard data={item} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* <div className="py-10" id="recommended tokens">
          <div className="section container mx-auto space-y-6">
            <div className="text-center max-w-[84rem] mx-auto mb-12">
              <h2 className="justify-center section-title text-left text-3xl font-bold text-gray-800 dark:text-white">
                <span className="">Recomended</span>
              </h2>
            </div> */}
          {/* <ul className=" max-w[28rem] md:max-w[56rem] xl:max-w-[84rem] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-20"> */}
          <ul className="flex flex-wrap justify-equal">
            {dataForRecomended.map((item, index) => (
              <li className="md:w-1/2 px-5" key={index}>
                <div
                  onClick={() =>
                    navigate(`${import.meta.env.BASE_URL}asset/${index + 1}`)
                  }
                >
                  <CustomCard data={item} />
                </div>
              </li>
            ))}
          </ul>
          {/* </div> */}
          {/* </div> */}

          <div className="py-10" id="all tokens">
            <div className="section container mx-auto space-y-6">
              <div className="text-center max-w-[84rem] mx-auto mb-12">
                <h2 className="justify-center section-title text-left text-3xl font-bold text-gray-800 dark:text-white">
                  <span className="">All</span>
                </h2>
              </div>
              {/* <ul className=" max-w[28rem] md:max-w[56rem] xl:max-w-[84rem] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-20"> */}
              <ul className="flex flex-wrap justify-equal">
                {dataAll.map((item, index) => (
                  <li className="md:w-1/2 px-5" key={index}>
                    <div
                      onClick={() =>
                        navigate(
                          `${import.meta.env.BASE_URL}asset/${index + 1}`
                        )
                      }
                    >
                      <CustomCard data={item} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <footer className="section !pb-0 bg-bgdark">
            <div className="border-b border-white/10 dark:border-white/10 pb-8">
              <div className="container mx-auto pt-10">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="space-y-4 px-4">
                      {/* <div>
                        <h6 className="text-white text-lg leading-none">
                          เกี่ยวกับบริษัท
                        </h6>
                        <hr className="w-10 border-t-4 border-primary inline-block mx-auto" />
                      </div> */}
                      {/* <img
                        src={ALLImages("logoWhite")}
                        className="w-auto"
                        alt="img"
                      /> */}
                      <p className="text-base text-gray-400 dark:text-gray-400">
                        ดิจิทัล แอสเซต
                      </p>
                      <p className="text-white text-lg pt-4">Community</p>
                      <div className="flex space-x-1 rtl:space-x-reverse">
                        <button
                          aria-label="button"
                          type="button"
                          className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 dark:bg-white/5 text-gray-400 dark:text-gray-400"
                        >
                          <i className="ri ri-github-line text-lg leading-none"></i>
                        </button>
                        <button
                          aria-label="button"
                          type="button"
                          className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 dark:bg-white/5 text-gray-400 dark:text-gray-400"
                        >
                          <i className="ri ri-instagram-line text-lg leading-none"></i>
                        </button>
                        <button
                          aria-label="button"
                          type="button"
                          className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 dark:bg-white/5 text-gray-400 dark:text-gray-400"
                        >
                          <i className="ri ri-twitter-line text-lg leading-none"></i>
                        </button>
                        <button
                          aria-label="button"
                          type="button"
                          className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 dark:bg-white/5 text-gray-400 dark:text-gray-400"
                        >
                          <i className="ri ri-linkedin-line text-lg leading-none"></i>
                        </button>
                        <button
                          aria-label="button"
                          type="button"
                          className="m-0 rounded-full p-2 ti-btn ti-btn-outline !border-0 bg-white/5 dark:bg-white/5 text-gray-400 dark:text-gray-400"
                        >
                          <i className="ri ri-google-line text-lg leading-none"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-4">
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="space-y-3 px-4">
                        {/* <div>
                          <h6 className="text-white text-lg leading-none">
                            เกี่ยวกับบริษัท
                          </h6>
                          <hr className="w-10 border-t-4 border-primary inline-block mx-auto" />
                        </div> */}
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
                        {/* <div>
                          <h6 className="text-white text-lg leading-none">
                            Our Pages
                          </h6>
                          <hr className="w-10 border-t-4 border-primary inline-block mx-auto" />
                        </div> */}
                        <ul className="space-y-3 text-gray-400 dark:text-gray-400">
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
                          <li>
                            <Link to="#">รายงานข้อมูลคุณภาพการให้บริการ</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-4">
                    <div className="space-y-3 px-4">
                      <div>
                        <h6 className="text-white text-lg leading-none">
                          Contact Us
                        </h6>
                        <hr className="w-10 border-t-4 border-primary inline-block mx-auto" />
                      </div>
                      <ul className="space-y-3 text-gray-400 dark:text-gray-400">
                        <li>
                          {" "}
                          <Link to="#" className="inline-flex">
                            <i className="text-white ri-home-8-line ltr:mr-2 rtl:ml-2"></i>{" "}
                            xx/xx อาคาร xxx ชั้น xx ถนน xx แขวง xx เขต xx
                            กรุงเทพ 1xxxx
                          </Link>{" "}
                        </li>
                        <li>
                          {" "}
                          <Link to="#" className="inline-flex">
                            <i className="text-white ri-mail-line ltr:mr-2 rtl:ml-2"></i>
                            info@admin.com
                          </Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="#" className="inline-flex">
                            <i className="text-white ri-phone-line ltr:mr-2 rtl:ml-2"></i>{" "}
                            xx xxx xxxx
                          </Link>
                        </li>
                        {/* <li>
                          {" "}
                          <Link to="#" className="inline-flex">
                            <i className="text-white ri-printer-line ltr:mr-2 rtl:ml-2"></i>{" "}
                            02 088 4699
                          </Link>{" "}
                        </li> */}
                        {/* <li>
                          {" "}
                          <Link to="#" className="inline-flex">
                            <i className="text-white ri-global-line ltr:mr-2 rtl:ml-2"></i>
                            https://example.com
                          </Link>{" "}
                        </li> */}
                      </ul>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-4"></div>
                  <div className="col-span-12 lg:col-span-4">
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
                              <Link to="#our-mission">
                                ปณิธานการดำเนินธุรกิจ
                              </Link>
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
                <Link to="#" className="text-primary">
                  {" "}
                  Digital Asset
                </Link>
              </p>
            </div>
            <div
              className="scrollToTop flex"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              <span className="arrow">
                <i className="ri-arrow-up-s-fill text-xl"></i>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Landing);
