import { useNavigate } from "react-router-dom";
import "./SignUpType.scss";

const SignUpType = () => {
  //resetTitleFavIcon;
  const navigate = useNavigate();
  const handleIndiividual = () => {
    navigate(
      `${import.meta.env.BASE_URL}authentication/signup/addindividualaccount`
    );
  };
  const handleCorporate = () => {
    navigate(
      `${import.meta.env.BASE_URL}authentication/signup/addcorporateaccount`
    );
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="pb-10 md:pb-20">
        <div className="header-title font-bold md:text-3xl">
          Sign up as a Corporate or Individual
        </div>
      </div>
      <div className="flex space-x-10 md:space-x-40">
        <div
          className="flex justify-center items-center font-bold md:text-xl corporate-container hover:bg-primary hover:text-white"
          onClick={handleCorporate}
        >
          Corporate
        </div>
        <div
          className="flex justify-center items-center font-bold md:text-xl individual-container hover:bg-primary hover:text-white"
          onClick={handleIndiividual}
        >
          Individual
        </div>
      </div>
    </div>
  );
};

export default SignUpType;
