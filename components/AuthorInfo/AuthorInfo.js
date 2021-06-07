import React from "react";
import AuthorInfoStyles from "./AuthorInfo.module.scss";

const AuthorInfo = ({ authorInfo: { authorName, authorPhoto } }) => {
  return (
    <section className={AuthorInfoStyles.wrapper}>
      <div className="container p-5">
        <p className=" bold-font">Wrote by: </p>
        <div className="d-flex align-items-center ">
          <img
            src={authorPhoto ? authorPhoto : "/assets/images/placeholder.jpg"}
            className="profile-img-large"
            alt="author"
          />
          {authorName && (
            <h3 className="my-3 mx-3 text-capitalize bold-font">{` ${authorName}`}</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthorInfo;
