import React from "react";
import DontHaveArticles from "../DontHaveArticles/DontHaveArticles";
import Card from "./../Card/Card";

const MyFavorites = ({ user, myFavoritesList }) => {
  const renderArticles = () => {
    return (
      <div className="row mx-0">
        {myFavoritesList &&
          myFavoritesList.length > 0 &&
          myFavoritesList.map((article) => (
            <Card key={article.id} article={article} user={user} />
          ))}
      </div>
    );
  };

  const dontHaveFavortitesContent = () => <p>You have no favourites yet</p>;

  return myFavoritesList && myFavoritesList.length > 0 ? (
    renderArticles()
  ) : (
    <DontHaveArticles content={dontHaveFavortitesContent()} />
  );
};

export default MyFavorites;
