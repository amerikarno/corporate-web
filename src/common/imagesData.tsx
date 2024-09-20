import logo from "@assets/drawIcon/up.png";
import logo2 from "@assets/drawIcon/up2.png";
import example from "@assets/drawIcon/example.png";
const picsum120 = "https://picsum.photos/120";
const picsum200 = "https://picsum.photos/200";
const picsum150 = "https://picsum.photos/150";

const getImages = (img: string): string => {
  const i: any = {
    logo,
    example,
    picsum120,
    picsum150,
    picsum200,
    logo2,
  };
  return i[img];
};

export default getImages;
