import React from "react";
import Image from "next/image";
import { socialIconList } from "./../../utils/dataSource";
import footerStyle from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer
      className={`d-flex justify-content-center pt-3 ${footerStyle.footer}`}
    >
      {socialIconList.map(({ href, alt, id, imgSrc }) => (
        <a href={href} key={id}>
          <Image src={imgSrc} alt={alt} width="50" height="50" />
        </a>
      ))}
    </footer>
  );
};

export default Footer;
