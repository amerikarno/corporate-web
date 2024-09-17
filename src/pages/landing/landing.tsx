import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeChanger } from "@/redux/Action";
import store from "@/redux/store";
import ALLImages from "@/util/imageData";
import { Collapsis } from "@/components/collapse/collapse";

interface datatype {
  ThemeChanger: any;
}

const Landing = ({ ThemeChanger }: datatype) => {
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

  function toggleNavigation() {
    if (window.innerWidth <= 992) {
      const theme = store.getState();
      ThemeChanger({ ...theme, toggled: "open", dataNavLayout: "horizontal" });
    }
  }

  function handleClick() {
    const theme = store.getState();
    ThemeChanger({ ...theme, toggled: "close", dataNavLayout: "horizontal" });
  }

  return (
    <div id="responsive-overlay">
      <div className="landing-page-wrapper relative">
        <header className="header custom-sticky !top-0 !w-full lg:hidden">
          <nav className="main-header" aria-label="Global">
            <div className="header-content justify-between">
              <div className="header-left">
                <div className="">
                  <button
                    type="button"
                    className="sidebar-toggle"
                    onClick={() => toggleNavigation()}
                  >
                    <span className="sr-only">Toggle Navigation</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-headerprime"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M24 0v24H0V0h24z"
                        fill="none"
                        opacity=".87"
                      ></path>
                      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="header-center">
                <div className="responsive-logo my-auto">
                  <Link
                    className="responsive-logo-light"
                    to={`${import.meta.env.BASE_URL}dashboards/sales/`}
                    aria-label="Brand"
                  >
                    {/* <img
                      src={ALLImages("logo")}
                      alt="logo"
                      className="mx-auto"
                    /> */}
                  </Link>
                  <Link
                    className="responsive-logo-dark"
                    to={`${import.meta.env.BASE_URL}dashboards/sales/`}
                    aria-label="Brand"
                  >
                    {/* <img
                      src={ALLImages("logo")}
                      alt="logo"
                      className="mx-auto"
                    /> */}
                  </Link>
                </div>
              </div>
              <div className="header-right ltr:!ml-0 rtl:!mr-0">
                <button
                  aria-label="button"
                  type="button"
                  className="hs-collapse-toggle ti-btn ti-btn-ghost-light m-0 py-1"
                  id="headercollapse"
                  data-hs-collapse="#headercollapse-heading"
                >
                  <i className="ri-more-2-line text-base"></i>
                </button>
                <div
                  id="headercollapse-heading"
                  className="hs-collapse w-full overflow-hidden transition-[height] duration-300 hidden absolute top-[4.45rem] inset-x-0 p-5 bg-white dark:bg-bgdark"
                  aria-labelledby="headercollapse"
                >
                  <div className="flex space-x-3 rtl:space-x-reverse">
                    <Link
                      to={`${
                        import.meta.env.BASE_URL
                      }Authentication/signup/basic/`}
                      className="ti-btn w-[6.375rem] ti-btn-dark m-0 p-2"
                    >
                      Sign Up
                    </Link>
                    <Link
                      to={`${import.meta.env.BASE_URL}dashboards/sales/`}
                      className="ti-btn w-[6.375rem] m-0 p-2 ti-btn-primary"
                    >
                      Get Started
                    </Link>
                    <Link
                      aria-label="anchor"
                      to="#"
                      className="ti-btn m-0 p-2 px-3 ti-btn-secondary"
                      data-hs-overlay="#hs-overlay-switcher"
                    >
                      <i className="ri-settings-2-line animate-spin"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <aside className="app-sidebar" id="sidebar">
          <div className="container mx-auto lg:p-6 !p-0">
            <div className="main-sidebar">
              <nav className="main-menu-container nav nav-pills flex-column sub-open">
                <div className="landing-logo-container my-auto hidden lg:block">
                  <div className="responsive-logo">
                    {/* <Link
                      className="responsive-logo-light"
                      to="#"
                      // to={`${import.meta.env.BASE_URL}dashboards/sales/`}
                      aria-label="Brand"
                    >
                      <img
                        src={ALLImages("logo")}
                        alt="logo"
                        className="mx-auto"
                      />
                    </Link> */}
                    <Link
                      className="responsive-logo-dark"
                      to={`${import.meta.env.BASE_URL}dashboards/sales/`}
                      aria-label="Brand"
                    >
                      <img
                        src={ALLImages("dark")}
                        alt="logo"
                        className="mx-auto"
                      />
                    </Link>
                  </div>
                </div>
                <div className="slide-left" id="slide-left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#7b8191"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                  </svg>
                </div>
                <div className="slide-right" id="slide-right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#7b8191"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                  </svg>
                </div>
                <div className="lg:flex hidden space-x-2 rtl:space-x-reverse">
                  <Link
                    // to={`${
                    //   import.meta.env.BASE_URL
                    // }Authentication/signup/basic/`}
                    to={`${
                      import.meta.env.BASE_URL
                    }Authentication/signup/addindividualaccount/`}
                    className="ti-btn w-[6.375rem] ti-btn-dark m-0 p-2"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to={`${import.meta.env.BASE_URL}firebase/firebaselogin/`}
                    className="ti-btn w-[6.375rem] m-0 p-2 ti-btn-primary"
                  >
                    Login
                  </Link>
                  {/* <Link
                    aria-label="anchor"
                    to="#"
                    className="ti-btn m-0 p-2 px-3 ti-btn-secondary"
                    data-hs-overlay="#hs-overlay-switcher"
                  >
                    <i className="ri-settings-2-line animate-spin"></i>
                  </Link> */}
                </div>
              </nav>
            </div>
          </div>
        </aside>

        <div className="main-content landing-main !p-0" onClick={handleClick}>
          <div className="py-10" id="services">
            <div className="section container mx-auto space-y-6">
              <div className="text-center max-w-[80rem] mx-auto mb-12">
                <h2 className="justify-center section-title text-center text-3xl font-bold text-gray-800 dark:text-white md:text-4xl lg:text-5xl">
                  <span className="px-3">Our Services</span>
                </h2>
                <p className="text-center text-gray-500 dark:text-white/70 text-base mt-4">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Pariatur quam saepe enim maxime! Eligendi quas itaque
                  voluptatibus, aspernatur illo, natus cumque odio, molestiae
                  obcaecati ducimus sit ratione recusandae perferendis culpa?
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:!grid-cols-4 gap-6">
                <div className="box landing-service text-center mb-0">
                  <div className="box-body">
                    <div className="landing-service-img mb-4 avatar avatar-lg rounded-full bg-primary p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-transparent stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-gray-800 dark:text-white text-xl font-semibold my-auto mb-2">
                        Design Quality
                      </h3>
                      <p className="text-gray-500 dark:text-white/70 text-base">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Pariatur quam saepe enim maxime!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box landing-service text-center mb-0">
                  <div className="box-body">
                    <div className="landing-service-img mb-4 avatar avatar-lg rounded-full bg-primary p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-transparent stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-gray-800 dark:text-white text-xl font-semibold my-auto mb-2">
                        Customization
                      </h3>
                      <p className="text-gray-500 dark:text-white/70 text-base">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Pariatur quam saepe enim maxime!{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box landing-service text-center mb-0">
                  <div className="box-body">
                    <div className="landing-service-img mb-4 avatar avatar-lg rounded-full bg-primary p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-transparent stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-gray-800 dark:text-white text-xl font-semibold my-auto mb-2">
                        Documentation
                      </h3>
                      <p className="text-gray-500 dark:text-white/70 text-base">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Pariatur quam saepe enim maxime!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="box landing-service text-center mb-0">
                  <div className="box-body">
                    <div className="landing-service-img mb-4 avatar avatar-lg rounded-full bg-primary p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-transparent stroke-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
                        />
                      </svg>
                    </div>
                    <div className="">
                      <h3 className="text-gray-800 dark:text-white text-xl font-semibold my-auto mb-2">
                        Regular Updates
                      </h3>
                      <p className="text-gray-500 dark:text-white/70 text-base">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Pariatur quam saepe enim maxime!{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="section !pb-0 bg-bgdark">
            <div className=" border-b border-white/10 dark:border-white/10 pb-8">
              <div className="container mx-auto">
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
                {/* . Designed with{" "}
                <span className="ri ri-heart-fill text-red-500"></span> by{" "}
                <Link className="text-primary" to="#">
                  {" "}
                  Spruko{" "}
                </Link>{" "}
                All rights reserved{" "} */}
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Landing);
