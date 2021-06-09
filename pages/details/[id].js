import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import Cookies from "js-cookie";
import { ARTICLES, BASE_HREF } from "../../utils/constants";
import Article from "../../components/Article/Article";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
import HeadSection from "../../components/HeadSection/HeadSection";
import LoaderComp from "../../components/Loader/Loader";
import ArticleCover from "../../components/ArticleCover/ArticleCover";
import Head from "next/head";

const articleDetails = ({ articleInfo }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [articleID, setArticleID] = useState(null);

  useEffect(() => {
    Cookies.get("userInfo") &&
      setUser(JSON.parse(Cookies.get("userInfo")) || null);
  }, []);

  return (
    <section className="section-min-height">
      <HeadSection
        title={`Blog | ${articleInfo.title}`}
        metadata={[
          {
            name: "title",
            content: `${articleInfo.title}`,
          },
          {
            name: "description",
            content: "Next.js blog app react, next js and firebase",
          },
          {
            name: "keywords",
            content:
              "HTML, CSS, CSS3, JavaScript, react, redux, react-redux, firebase, firestore",
          },
          { name: "author", content: "Samira Saad" },
          {
            name: "image:url",
            content: `${articleInfo.coverImg}`,
          },
          {
            name: "image:width",
            content: `400`,
          },
          {
            name: "image:height",
            content: `400`,
          },
        ]}
        links={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      {articleInfo && !loading ? (
        <>
          {/* ARTICLE COVER */}
          <ArticleCover img={articleInfo.coverImg} />
          {/* ARTICLE TEMPLATE */}
          <Article
            articleInfo={articleInfo}
            articleFullURL={`${BASE_HREF}${router.asPath}`}
            isDetails={true}
            user={user}
          />
          {/* AUTHOR INFO  */}
          <AuthorInfo articleInfo={articleInfo} />
        </>
      ) : (
        <div className="d-flex justify-content-center my-5">
          <LoaderComp />
        </div>
      )}
    </section>
  );
};

export default articleDetails;

articleDetails.getInitialProps = async function (ctx) {
  const id = ctx.query.id;
  let articleInfo = [];
  const querySnapshot = await db.collection("Articles").get();
  querySnapshot.forEach((doc) => {
    articleInfo.push(doc.data());
  });

  return {
    articleInfo: articleInfo.find((article) => article.id === id),
  };
};
