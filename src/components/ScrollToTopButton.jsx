import React, { useEffect, useState } from "react";
import { Image } from "theme-ui";
import { scrollUp } from "../assets";
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 500) {
        setVisible(true);
      } else if (scrolled <= 500) {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Image
      src={scrollUp}
      onClick={scrollToTop}
      sx={{
        display: visible ? "inline" : "none",
        opacity: visible ? "1" : "0",
        position: "fixed",
        width: "50px",
        left: "75.5%",
        bottom: "40px",
        height: "50px",
        fontSize: "3rem",
        zIndex: "1",
        cursor: "pointer",
        color: "green",
        objectFit: "contain",
        transition: "all 2sec ease-out",
      }}
    />
  );
};

export default ScrollToTopButton;
