import { useEffect } from "react";
import { addToFavourites } from "./../../utils/helpers";
import ConfirmatiomDialog from "../ConfirmatiomDialog/ConfirmatiomDialog";
import CardStyle from "./Card.module.scss";

const Card = ({ article, user, canDelete, deleteArticle }) => {
  useEffect(() => {
    let contentElem = document.getElementById(article.id);
    if (article.content && contentElem) {
      contentElem.innerHTML = article.title;
    }
  }, [article, user]);

  const handleCancel = () => {
    console.log("cancel ");
  };

  return (
    <div className={`col-xl-3 col-lg-4 col-md-6 my-3 p-3 `} key={article.id}>
      <div className={`p-3 ${CardStyle.wrapper}`}>
        <div className="position-relative">
          {canDelete && (
            <ConfirmatiomDialog
              className={`position-absolute  ${CardStyle.delete}`}
              dialogTitle="Are You Sure You Want To Delete This Article ?"
              cancelText="No"
              confirmText="Delete"
              handleConfirm={() => deleteArticle(article.id)}
              clickableItem={<img src="/assets/images/delete.svg" />}
            />
          )}
          <h4 className={`${canDelete && "pt-4"}`} id={article.id}></h4>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center my-4 pt-4">
          <img
            src={
              article.authorPhoto
                ? article.authorPhoto
                : "/assets/images/placeholder.jpg"
            }
            className="profile-img-large"
          />
          <p className="my-3">{` By: ${article.authorName}`}</p>
        </div>
        <div className="d-flex justify-content-between align-items-baseline">
          <div
            className={`px-3 py-2 my-2  ${CardStyle.category}`}
            style={{ backgroundColor: article.color }}
          >
            <span>{article.categoryName}</span>
          </div>
          {(user &&
            user.uid &&
            article.favouritBY.filter((obj) => obj.id === user.uid).length ===
              0 &&
            article.authorID !== user.uid) ||
          !user ? (
            <div
              className="d-flex flex-column align-items-center"
              onClick={() => addToFavourites(user, article, article.favouritBY)}
            >
              <img
                src="/assets/images/unfavorite.svg"
                alt="favorite"
                className={CardStyle.fav}
              />
              <p className="mb-0 small font-weight-bold">
                {article.favouritBY.length}
              </p>
            </div>
          ) : user &&
            article.favouritBY.filter((obj) => obj.id === user.uid).length >
              0 ? (
            <div
              className="d-flex flex-column align-items-center"
              onClick={() => addToFavourites(user, article, article.favouritBY)}
            >
              <img
                src="/assets/images/favourites.svg"
                alt="unfavorite"
                className={CardStyle.fav}
              />
              <p className="mb-0 small font-weight-bold">
                {article.favouritBY.length}
              </p>
            </div>
          ) : (
            user &&
            article.authorID === user.uid && (
              <div className="d-flex flex-column align-items-center">
                <img
                  src="/assets/images/unfavorite.svg"
                  alt="unfavorite"
                  className={CardStyle.disabledfav}
                />
                <p className="mb-0 small font-weight-bold">
                  {article.favouritBY.length}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
