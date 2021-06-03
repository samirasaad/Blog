import { useEffect } from "react";
import { addToFavourites } from "../../utils/helpers";
import FloatingShareMenu from "../FloatingShareMenu/FloatingShareMenu";
import ArticleStyles from "./Article.module.scss";

const Article = ({ user, articleInfo, articleFullURL, isDetails }) => {
  useEffect(() => {
    let contentElem = document.querySelector("#content");
    if (articleInfo && articleInfo.content && contentElem) {
      contentElem.innerHTML = articleInfo.content && articleInfo.content;
    }
  });

  const renderArticleTemplate = () => (
    <div className={`${ArticleStyles.floated_section}`}>
      {(isDetails &&
        user &&
        user.uid &&
        articleInfo &&
        articleInfo.favouritBY &&
        articleInfo.favouritBY.filter((obj) => obj.id === user.uid).length ===
          0 &&
        articleInfo &&
        articleInfo.favouritBY &&
        articleInfo.authorID !== user.uid) ||
      !user ? (
        <div
          className="d-flex flex-column align-items-end mx-3 justify-content-center pt-3"
          onClick={(e) =>
            addToFavourites(e, user, articleInfo, articleInfo.favouritBY)
          }
        >
          <img
            src="/assets/images/unfavorite.svg"
            alt="favorite"
            className={`fav`}
          />
          <p className="mb-0 mr-2 small font-weight-bold dimmed-text">
            {articleInfo &&
              articleInfo.favouritBY &&
              articleInfo.favouritBY.length}
          </p>
        </div>
      ) : isDetails &&
        user &&
        articleInfo &&
        articleInfo.favouritBY &&
        articleInfo.favouritBY.filter((obj) => obj.id === user.uid).length >
          0 ? (
        <div
          className="d-flex flex-column align-items-end mx-3 justify-content-center pt-3"
          onClick={(e) =>
            addToFavourites(e, user, articleInfo, articleInfo.favouritBY)
          }
        >
          <img
            src="/assets/images/favourites.svg"
            alt="unfavorite"
            className={`fav`}
          />
          <p className="mb-0 mr-2 small font-weight-bold dimmed-text">
            {articleInfo.favouritBY.length}
          </p>
        </div>
      ) : (
        isDetails &&
        user &&
        articleInfo.authorID === user.uid && (
          <div className="d-flex flex-column align-items-end mx-3 justify-content-center pt-3">
            <img
              src="/assets/images/unfavorite.svg"
              alt="unfavorite"
              className={`disabledfav`}
            />
            <p className="mb-0 mr-2 small font-weight-bold dimmed-text">
              {articleInfo.favouritBY.length}
            </p>
          </div>
        )
      )}

      <div className={`p-3 mb-5 ${ArticleStyles.content}`}>
        <div className={` ${ArticleStyles.heading}`}>
          {/* <div className={`text-center ${ArticleStyles.preview_img}`}>
            <img
              src={articleInfo.coverImg}
            />
          </div> */}
          <div className="justify-content-between my-3 d-flex flex-wrap">
            <h1 className={` font-weight-bold`}>
              {articleInfo.title && articleInfo.title}
            </h1>
            <p
              className={`py-2 px-4 font-weight-bold ${ArticleStyles.category}`}
              style={{
                backgroundColor: articleInfo.colorValue
                  ? articleInfo.colorValue
                  : articleInfo.color,
              }}
            >
              {articleInfo.categoryName && articleInfo.categoryName}
            </p>
          </div>
        </div>
        {articleInfo && articleInfo.content && (
          <div id="content" className={`p-4`}></div>
        )}
      </div>
    </div>
  );
  return (
    <section className={`container ${ArticleStyles.wrapper}`}>
      {isDetails && articleFullURL && (
        <FloatingShareMenu url={articleFullURL} />
      )}
      {renderArticleTemplate()}
    </section>
  );
};

export default Article;
