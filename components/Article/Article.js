import { useEffect } from "react";
import Btn from "../controls/Btn/Btn";
import { useRouter } from "next/router";
import ArticleStyles from "./Article.module.scss";

const Article = ({
  articleInfo: { content, title, colorValue, categoryName },
}) => {
  const router = useRouter();

  useEffect(() => {
    let contentElem = document.querySelector("#content");
    if (content && contentElem) {
      contentElem.innerHTML = content;
    }
  });

  return (
    <section className={ArticleStyles.wrapper}>
      <div className="d-flex justify-content-end ">
        <Btn
          className={ArticleStyles.edit}
          handleClick={() => router.push("/addArticle")}
          content={<img src="/assets/images/edit.svg" alt="edit" />}
        />
      </div>
      <div className={`p-2 mt-4 ${ArticleStyles.content}`}>
        <h3 className={`p-3`}>{title && title}</h3>
        <div className={`d-flex justify-content-end`}>
          <div
            className={`py-2 px-4 ${ArticleStyles.category}`}
            style={{ backgroundColor: colorValue }}
          >
            {categoryName}
          </div>
        </div>
        <div id="content" className={`p-4 `}></div>
      </div>
    </section>
  );
};

export default Article;
