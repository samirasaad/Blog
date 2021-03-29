import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Article from "../../components/Article/Article";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
import { db } from "../../firebase";
import { ARTICLES, BASE_HREF } from "../../utils/constants";
import Cookies from "js-cookie";
import HeadSection from "../../components/HeadSection/HeadSection";

const articleDetails = ({ id }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [articleID, setArticleID] = useState(null);
  const [articleInfo, setArticleInfo] = useState({});

  useEffect(() => {
    id && setArticleID(id);
  }, [id]);

  useEffect(() => {
    Cookies.get("userInfo") && setUser(JSON.parse(Cookies.get("userInfo")) || null);
  }, []);

  useEffect(() => {
    articleID && getArticleDetails();
  }, [articleID]);

  const getArticleDetails = () => {
    db.collection(ARTICLES)
      .where("id", "==", articleID)
      .onSnapshot(
        (querySnapshot) => {
          let articleDetails = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          setArticleInfo(articleDetails[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <section className="section-min-height">
      <HeadSection
        title="Blog | Article details"
        metadata={[
          { name: "description", content: "Next.js blog app react , next js and firebase" },
          {
            name: "keywords",
            content:
              "HTML, CSS, CSS3, JavaScript, react, redux, react-redux, firebase, firestire",
          },
          { name: "author", content: "Samira saad" },
        ]}
        links={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      {articleInfo && (
        <AuthorInfo
          authorInfo={{
            authorName: articleInfo && articleInfo.authorName,
            authorPhoto: articleInfo && articleInfo.authorPhoto,
          }}
        />
      )}
      {articleInfo && (
        <Article
          articleInfo={articleInfo}
          articleFullURL={`${BASE_HREF}${router.asPath}`}
          isDetails={true}
          user={user}
        />
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
