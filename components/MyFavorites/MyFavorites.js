import React from "react";
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
  return myFavoritesList && myFavoritesList.length > 0 && renderArticles();
};

export default MyFavorites;
