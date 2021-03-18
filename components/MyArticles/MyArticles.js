import React from "react";
import Link from "next/link";
import DontHaveArticles from "../DontHaveArticles/DontHaveArticles";
import Card from "./../Card/Card";

const MyArticles = ({ user, myArticlesList, deleteArticle }) => {
  const renderArticles = () => {
    return (
      <div className="row mx-0">
        {myArticlesList &&
          myArticlesList.length > 0 &&
          myArticlesList.map((article) => (
            <Card
              key={article.id}
              article={article}
              user={user}
              canDelete={true}
              deleteArticle={deleteArticle}
            />
          ))}
      </div>
    );
  };

  const dontHAveArticleConetnt = () => (
    <>
      <p>You have no articles yet</p>
      <Link href="/addArticle">
        <a className="mx-3">
          <img src="/assets/images/plus.svg" alt="add" />
        </a>
      </Link>
    </>
  );

  return myArticlesList && myArticlesList.length > 0 ? (
    renderArticles()
  ) : (
    <DontHaveArticles content={dontHAveArticleConetnt()} />
  );
};

export default MyArticles;
