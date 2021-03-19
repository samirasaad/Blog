import { useEffect } from "react";
import FloatingShareMenu from "../FloatingShareMenu/FloatingShareMenu";
import ArticleStyles from "./Article.module.scss";

const Article = ({ articleInfo,id }) => {
  useEffect(() => {
    let contentElem = document.querySelector("#content");
    if (articleInfo && articleInfo.content && contentElem) {
      contentElem.innerHTML = articleInfo.content && articleInfo.content;
    }
  });

  return (
    <section className={`container ${ArticleStyles.wrapper}`}>
      <FloatingShareMenu />
      <div className={`${ArticleStyles.floated_section}`}>
        <div className="d-flex justify-content-end">
          <p className="text-muted mb-0 mx-4">
            {articleInfo.favouritBY && articleInfo.favouritBY.length}
          </p>
        </div>
        <div className={`p-3 mb-5 ${ArticleStyles.content}`}>
          <div className="d-flex justify-content-between">
            <h3 className={`px-3`}>{articleInfo.title && articleInfo.title}</h3>
            <div>
              <span
                className={`py-2 px-4 font-weight-bold ${ArticleStyles.category}`}
                style={{
                  backgroundColor: articleInfo.colorValue
                    ? articleInfo.colorValue
                    : articleInfo.color,
                }}
              >
                {articleInfo.categoryName && articleInfo.categoryName}
              </span>
            </div>
          </div>
          {articleInfo && articleInfo.content && (
            <div id="content" className={`p-4`}></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Article;
