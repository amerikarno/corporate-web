import { useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Link {
  url: string;
  text: string;
}

const Navbar1: React.FC = () => {
  const links: Link[] = [
    { url: 'page1', text: 'Page 1' },
    { url: 'page2', text: 'Page 2' },
    { url: 'page3', text: 'Page 3' },
    // Add more links as needed
  ];

  const onScroll = () => {
    const sections = document.querySelectorAll('.side-menu__item');
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    sections.forEach((elem) => {
      const value: any = elem.getAttribute('href');
      const refElement = document.getElementById(value);
      if (refElement) {
        const scrollTopMinus = scrollPos + 73;
        if (
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          elem.classList.add('active');
        } else {
          elem.classList.remove('active');
        }
      }
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute('href');
    const location = document.getElementById(target!)!.offsetTop;
    window.scrollTo({
      left: 0,
      top: location - 64,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      onScroll();
    };

    const pageLinks = document.querySelectorAll('.side-menu__item');
    pageLinks.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        const target = elem.getAttribute('href')!.substring(1);
        document.getElementById(target)!.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      });
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      // Clean up event listeners when component unmounts
      pageLinks.forEach((elem:any) => {
        elem.removeEventListener('click', handleClick);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ul className="main-menu ltr:!ml-auto rtl:!mr-auto">
      {links.map((link, i) => (
        <li className="slide" key={i}>
          <a href={`#${link.url}`} onClick={handleClick} className="side-menu__item">
            <span className="side-menu__label">{link.text}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Navbar1;
