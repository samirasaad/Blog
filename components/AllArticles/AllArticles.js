import React from "react";
import Card from "../Card/Card";

const AllArticles = ({ articlesList, user }) => {
  const renderArticles = () => (
    <div className="row mx-0">
      {articlesList &&
        articlesList.length > 0 &&
        articlesList.map((article) => (
          <Card key={article.id} article={article} user={user} />
        ))}
    </div>
  );

  return articlesList && articlesList.length > 0 ? (
    renderArticles()
  ) : (
    <span>...loading</span>
  );
};

export default AllArticles;
