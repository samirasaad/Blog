import React from "react";
import articleCoveStyles from "./ArticleCover.module.scss";

const ArticleCover = ({ img }) => {
  return (
    <>
      <div
        className={` mx-5 mt-5 text-center ${articleCoveStyles.cover}`}
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className={`${articleCoveStyles.box}`}></div>
    </>
  );
};

export default ArticleCover;
