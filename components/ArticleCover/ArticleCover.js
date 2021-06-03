import React from "react";
import articleCoveStyles from "./ArticleCover.module.scss";
const ArticleCover = ({ articleInfo, img }) => {
  console.log(articleInfo);
  console.log(img);
  return (
    <div
      className={`container mt-5 text-center ${articleCoveStyles.cover}`}
      style={{ backgroundImage: `url(${img})`,backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat:'no-repeat' }}
    >
    </div>
  );
};

export default ArticleCover;
