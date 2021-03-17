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
      <div className={`p-3 mt-4 mb-5 ${ArticleStyles.content}`}>
        <div className="d-flex justify-content-between">
          <h3 className={`px-3`}>{title && title}</h3>
          <div>
            <span
              className={`py-2 px-4 ${ArticleStyles.category}`}
              style={{ backgroundColor: colorValue }}
            >
              {categoryName}
            </span>
          </div>
        </div>
        <div id="content" className={`p-4 `}></div>
      </div>
    </section>
  );
};

export default Article;
