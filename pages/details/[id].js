import React, { useEffect, useState } from "react";
import Article from "../../components/Article/Article";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
import { db } from "../../firebase";
import { ARTICLES } from "../../utils/constants";

const articleDetails = ({ id }) => {
  console.log(id);
  const [articleID, setArticleID] = useState(null);
  const [articleInfo, setArticleInfo] = useState({});

  // const articleInfo = {
  //   categoryName: "ddddddddddddddd",
  //   colorValue: "#697689",
  //   content: "<p>ddddddddddddddddddd</p>",
  //   title: "deedddddddddddddddd",
  // };

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     let id =
  //       localStorage.getItem("userInfo") &&
  //       JSON.parse(localStorage.getItem("userInfo")).uid;
  //     setUser(JSON.parse(localStorage.getItem("userInfo")));
  //   }
  // }, []);

  useEffect(() => {
    id && setArticleID(id);
  }, [id]);

  useEffect(() => {
    articleID && getArticleDetails();
  }, [articleID]);

  const getArticleDetails = () => {
    db.collection(ARTICLES)
      .doc(articleID)
      .get()
      .then((res) => {
        console.log(res.data());
        setArticleInfo(res.data());
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="section-min-height">
     {articleInfo && <AuthorInfo
        authorInfo={{
          authorName: articleInfo && articleInfo.authorName,
          authorPhoto: articleInfo && articleInfo.authorPhoto,
        }}
      />}
      {articleInfo && <Article articleInfo={articleInfo} />}
    </section>
  );
};

export default articleDetails;

articleDetails.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  return {
    id: id,
  };
};
