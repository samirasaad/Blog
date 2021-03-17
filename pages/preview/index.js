import { useEffect, useState } from "react";
import Article from "../../components/Article/Article";

const Preview = () => {
  const [articleInfo, setArticleInfo] = useState("");

  useEffect(() => {
    localStorage.getItem("article") &&
    setArticleInfo(JSON.parse(localStorage.getItem("article")));
  }, []);

  return (
    <section className="container section-min-height">
      {articleInfo && <Article articleInfo={articleInfo} />}
    </section>
  );
};

export default Preview;
