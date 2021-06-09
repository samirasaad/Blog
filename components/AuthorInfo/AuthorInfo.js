import React from "react";
import AuthorInfoStyles from "./AuthorInfo.module.scss";

const AuthorInfo = ({ articleInfo }) => {
  const renderPublishingDate = (dateTime) => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateTime * 1000).toLocaleDateString("en-US", options);
  };

  return (
    <section className={AuthorInfoStyles.wrapper}>
      <div className="container p-5">
        <p className=" bold-font">Wrote by: </p>
        <div className="d-flex align-items-center ">
          <img
            src={
              articleInfo.authorPhoto
                ? articleInfo.authorPhoto
                : "/assets/images/placeholder.jpg"
            }
            className="profile-img-large"
            alt="author"
          />
          <div className="d-flex flex-column">
            {articleInfo.authorName && (
              <h3 className="my-3 mx-3 text-capitalize bold-font">{` ${articleInfo.authorName}`}</h3>
            )}
            {articleInfo.id && (
              <p className="text-muted small mb-0 mx-3 text-capitalize bold-font">
                Published : {renderPublishingDate(articleInfo.id.split("-")[1])}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorInfo;
