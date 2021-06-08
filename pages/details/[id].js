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
  // const [articleInfo, setArticleInfo] = useState(null);

  useEffect(() => {
    Cookies.get("userInfo") &&
      setUser(JSON.parse(Cookies.get("userInfo")) || null);
  }, []);

  // useEffect(() => {
  //   id && setArticleID(id);
  // }, [id]);

  // useEffect(() => {
  //   let mounted = true;
  //   if (mounted && articleID) {
  //     articleID && getArticleDetails();
  //   }
  //   return () => (mounted = false);
  // }, [articleID]);

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
  console.log(articleInfo);
  return (
    <section className="section-min-height">
      <Head>
        <title>{`Blog | ${articleInfo && articleInfo.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={articleInfo.title} />
        {/* <meta property="og:description" content={productDetails.description} /> */}
        <meta property="og:image" content={articleInfo.coverImg} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      {/* <HeadSection
        title={`Blog | ${articleInfo && articleInfo.title}`}
        metadata={[
          {
            name: "title",
            content: `${articleInfo && articleInfo.title}`,
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
        ]}
        links={[{ rel: "icon", href: "/favicon.ico" }]}
      /> */}
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
          <AuthorInfo
            authorInfo={{
              authorName: articleInfo && articleInfo.authorName,
              authorPhoto: articleInfo && articleInfo.authorPhoto,
            }}
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

articleDetails.getInitialProps = async function (ctx) {
  const id = ctx.query.id;
  // let d = {};
  // console.log(id);
  // let x = await db
  //   .collection(ARTICLES)
  //   .where("id", "==", id)
  //   .onSnapshot(
  //     (querySnapshot) => {
  //       d = querySnapshot.docs.map((doc) => {
  //         return doc.data();
  //       });
  //       d = articleDetails[0];
  //       // console.log(articleDetails)
  //       // console.log(articleDetails)
  //       // setArticleInfo(articleDetails[0]);
  //       // setLoading(false);
  //     },
  //     (error) => {
  //       // setLoading(false);
  //       console.log(error);
  //     }
  //   );
  // console.log(d);

  let articleInfo = [];
  const querySnapshot = await db.collection("Articles").get();
  querySnapshot.forEach((doc) => {
    articleInfo.push(doc.data());
  });

  return {
    articleInfo: articleInfo.find((article) => article.id === id),
  };
};

// articleDetails.getInitialProps = async (ctx) => {
//   const id = ctx.query.id;
//   console.log(id);
//   let articleDetails = {};
//   const getArticleDetails = async () => {
//     // setLoading(true);
//    return await db
//       .collection(ARTICLES)
//       .where("id", "==", id)
//       .onSnapshot(
//         (querySnapshot) => {
//            articleDetails = querySnapshot.docs.map((doc) => {
//             return doc.data();
//           });
//           // d = articleDetails[0];
//           // console.log(articleDetails)
//           // console.log(articleDetails[0])
//           // setArticleInfo(articleDetails[0]);
//           // setLoading(false);
//         },
//         (error) => {
//           // setLoading(false);
//           console.log(error);
//         }
//       );
//   };
//  let x = getArticleDetails()
//   console.log(x)
//   console.log(articleDetails)
//   return {
//     articleInfo: articleDetails,
//   };
// };
