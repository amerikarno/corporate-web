import logo from "@assets/drawIcon/up.png";
import example from "@assets/drawIcon/example.png";

const getImages = (img: string): string => {
  const i: any = {
    logo,
    example,
  };
  return i[img];
};

export default getImages;
