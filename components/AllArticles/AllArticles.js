import React from "react";
import Card from "../Card/Card";

const AllArticles = ({ articlesList, user, addToFavourites }) => {
  const renderArticles = () => {
    return (
      <div className="row mx-0">
        {articlesList &&
          articlesList.length > 0 &&
          articlesList.map((article) => (
            <Card
              key={article.id}
              article={article}
              user={user}
              addToFavourites={addToFavourites}
            />
          ))}
      </div>
    );
  };

  return articlesList && articlesList.length > 0 ? (
    renderArticles()
  ) : (
    <span>...loading</span>
  );
};

export default AllArticles;
