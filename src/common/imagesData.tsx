import logo from "@assets/logo_ecg-03.png";
import example from "@assets/drawIcon/example.png";
import idOverLay from "@assets/ID_Card_overlay.svg";
import idCardPic from "@assets/id_card.svg";
import whiteBg from "@assets/drawIcon/white.png";
const png1 =
  "https://sto.demoex.vip/app/v1/statics/2024-09-17/5d0e4f57-c816-4951-b747-a68bf5ee8735.png";
const png2 =
  "https://sto.demoex.vip/app/v1/statics/2024-04-25/73ac6755-8734-4eb5-9b87-599c6e247399.png";
const png3 =
  "https://sto.demoex.vip/app/v1/statics/2024-04-25/fa336ac7-3f4c-41bc-9803-7f772ea9573b.png";
const png4 =
  "https://sto.demoex.vip/app/v1/statics/2024-04-12/b383a831-376e-44a8-b1ac-eacf3553bd0f.png";
const png5 =
  "https://sto.demoex.vip/app/v1/statics/2024-04-30/7122bab7-f982-4ad2-9cd8-f52514aed77e.png";
const png6 =
  "https://sto.demoex.vip/app/v1/statics/2024-04-25/e0b02551-2e07-44f0-9062-f9f052ba27b8.png";
const png7 =
  "https://sto.demoex.vip/app/v1/statics/2024-04-30/51e39a25-ef3a-4e40-af85-319d12ee68c4.png";
const png8 =
  "https://sto.demoex.vip/app/v1/statics/2024-04-26/86738313-dc41-47bd-8fb1-0fb8f8354d65.png";

export const randomImage = (): string => {
  const ran = Math.floor(Math.random() * 10);
  return `https://picsum.photos/${200 + ran}`;
};

const getImages = (img: string): string => {
  const i: any = {
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
