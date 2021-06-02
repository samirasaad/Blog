import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import Cookies from "js-cookie";
import { ARTICLES, BASE_HREF } from "../../utils/constants";
import Article from "../../components/Article/Article";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
import HeadSection from "../../components/HeadSection/HeadSection";
import LoaderComp from "../../components/Loader/Loader";

const articleDetails = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [articleID, setArticleID] = useState(null);
  const [articleInfo, setArticleInfo] = useState(null);

  useEffect(() => {
    Cookies.get("userInfo") &&
      setUser(JSON.parse(Cookies.get("userInfo")) || null);
  }, []);

  useEffect(() => {
    id && setArticleID(id);
  }, [id]);

  useEffect(() => {
    let mounted = true;
    if (mounted && articleID) {
      articleID && getArticleDetails();
    }
    return () => (mounted = false);
  }, [articleID]);

  const getArticleDetails = () => {
    setLoading(true);
    db.collection(ARTICLES)
      .where("id", "==", articleID)
      .onSnapshot(
        (querySnapshot) => {
          let articleDetails = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          setArticleInfo(articleDetails[0]);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          console.log(error);
        }
      );
  };

  return (
    <section className="section-min-height">
      <Head>
        <title>{articleInfo && articleInfo.title}</title>
        <meta name="author" content="Samira Saad" />
        <meta
          name="description"
          content={`blog article about ${articleInfo && articleInfo.title}`}
        />
      </Head>
      {articleInfo && !loading ? (
        <>
          <AuthorInfo
            authorInfo={{
              authorName: articleInfo && articleInfo.authorName,
              authorPhoto: articleInfo && articleInfo.authorPhoto,
            }}
          />
          <Article
            articleInfo={articleInfo}
            articleFullURL={`${BASE_HREF}${router.asPath}`}
            isDetails={true}
            user={user}
          />
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

articleDetails.getInitialProps = async (ctx) => {
  const id = ctx.query.id;
  return {
    id,
  };
};
