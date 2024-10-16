import "./SignUpCorporate.scss";
import { IoIosInformationCircle } from "react-icons/io";

const SignUpCorporate = () => {
  //resetTitleFavIcon;
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col text-center space-y-2 forCorporate-container bg-primary text-white relative">
        <div className="absolute text-3xl top-3 right-4">
          <IoIosInformationCircle />
        </div>
        <div className="header-title font-bold md:text-2xl  pb-4">
          Contact Us
        </div>
        <div className="header-title font-bold md:text-xl ">
          Please attempt to call &nbsp; XX XXX XXXX
        </div>
        {/* <div className="header-title font-bold text-xl">กรุณาติดต่อหมายเลขเบอร์โทร 0XXXXXXXXX</div> */}
      </div>
    </div>
  );
};

export default SignUpCorporate;
