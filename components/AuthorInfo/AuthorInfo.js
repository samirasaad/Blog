import React from "react";
import AuthorInfoStyles from "./AuthorInfo.module.scss";

const AuthorInfo = ({ authorInfo: { authorName, authorPhoto } }) => {
  return (
    <section className={AuthorInfoStyles.wrapper}>
      <main className="d-flex justify-content-center flex-column align-items-center p-5">
        <img
          src={authorPhoto ? authorPhoto : "/assets/images/placeholder.jpg"}
          className="profile-img-large"
          alt="author"
        />
        {authorName && (
          <h3 className="my-3 text-capitalize bold-font">{` By: ${authorName}`}</h3>
        )}
      </main>
    </section>
  );
};

export default AuthorInfo;
