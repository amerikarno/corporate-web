import logo from "@assets/logo_ecg-03.png";
import example from "@assets/drawIcon/example.png";
import idOverLay from "@assets/ID_Card_overlay.svg";
import idCardPic from "@assets/id_card.svg";
import whiteBg from "@assets/drawIcon/white.png";
import png1 from "@/assets/images/png1.png";
import png2 from "@/assets/images/png2.png";
import png3 from "@/assets/images/png3.png";
import png4 from "@/assets/images/png4.png";
import png5 from "@/assets/images/png5.png";
import png6 from "@/assets/images/png6.png";
import png7 from "@/assets/images/png7.png";
import png8 from "@/assets/images/png8.png";
import phoneIcon from "@/assets/images/otpPhone.svg";
import mailIcon from "@/assets/images/otpMail.svg";

export const randomImage = (): string => {
  const ran = Math.floor(Math.random() * 10);
  return `https://picsum.photos/${200 + ran}`;
};

const getImages = (img: string) => {
  const i: any = {
    phoneIcon,
    mailIcon,
    logo,
    example,
    idCardPic,
    idOverLay,
    png1,
    png2,
    png3,
    png4,
    png5,
    png6,
    png7,
    png8,
    whiteBg,
  };
  return i[img];
};

export default getImages;
