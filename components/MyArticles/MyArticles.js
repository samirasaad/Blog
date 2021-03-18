import React from "react";
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
  return myArticlesList && myArticlesList.length > 0 && renderArticles();
};

export default MyArticles;
