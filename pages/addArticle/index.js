import React, { useEffect, useState } from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import { db } from "./../../firebase";
import Cookies from "js-cookie";
import { ARTICLES } from "./../../utils/constants";
import { useRouter } from "next/router";
import Picker from "../../components/ColorPicker/ColorPicker";
import Btn from "../../components/controls/Btn/Btn";
import InputField from "../../components/controls/InputField/InputField";
import withPrivateRoute from "../../routeGuard/PrivateRoute";
import addArticleStyles from "./addArticle.module.scss";

const AddArticle = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [article, setArticle] = useState({
    content: "",
    title: "",
    colorValue: "#f47373",
    categoryName: "",
  });

  useEffect(() => {
    // check we on browser not server
    if (typeof window !== undefined) {
      if (Cookies.get("userInfo")) {
        setUser(JSON.parse(Cookies.get("userInfo")));
      }
    }

    if (Cookies.get("article")) {
      setArticle({
        content: JSON.parse(Cookies.get("article")).content,
        title: JSON.parse(Cookies.get("article")).title,
        colorValue: JSON.parse(Cookies.get("article")).colorValue,
        categoryName: JSON.parse(Cookies.get("article")).categoryName,
      });
    }

  }, []);

  // useEffect(() => {
  //   if (Cookies.get("article")) {
  //     console.log(Cookies.get("article").content)
  //     setArticle({
  //       content: JSON.parse(Cookies.get("article")).content,
  //       title: JSON.parse(Cookies.get("article")).title,
  //       colorValue: JSON.parse(Cookies.get("article")).colorValue,
  //       categoryName: JSON.parse(Cookies.get("article")).categoryName,
  //     });
  //   }
  // }, [router.pathname]);

  const handleEditorChange = (content, editor) => {
    setArticle({ ...article, content });
  };

  const handlePreview = () => {
    let articleObj = {
      title: article.title,
      content: article.content,
      colorValue: article.colorValue,
      categoryName: article.categoryName,
    };
    Cookies.set("article", JSON.stringify(articleObj));
    router.push("/preview");
  };

  const handleColorChange = (e) => {
    setArticle({ ...article, colorValue: e.hex });
  };

  const handleCategoryChange = (e) => {
    setArticle({ ...article, categoryName: e.target.value.substring(0, 15) });
  };

  const handleTitleChange = (e) => {
    setArticle({ ...article, title: e.target.value.substring(0, 60) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let timestamp = Math.ceil(new Date().getTime() / 1000).toString();
    let articleObj = {
      content: article.content,
      authorID: user.uid,
      timestamp,
      favouritBY: [],
      id: user.uid + "-" + timestamp,
      color: article.colorValue,
      categoryName: article.categoryName,
      title: article.title,
      authorName: user.displayName.toLowerCase(),
      authorPhoto: user.photoURL || "",
    };
    // add to firestore
    await db
      .collection(ARTICLES)
      .doc(user.uid + "-" + timestamp)
      .set(articleObj)
      .then(() => {
        setArticle({
          content: "",
          title: "",
          colorValue: "#f47373",
          categoryName: "",
        });
        Cookies.remove("article");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="container section-min-height">
      <h1 className={`mt-4 font-weight-bold ${addArticleStyles.title}`}>
        Article Details
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex justify-content-end mb-3">
          <Btn
            className={`${
              !article.content ||
              !article.categoryName ||
              !article.colorValue ||
              !article.title
                ? addArticleStyles.disabled_btn
                : addArticleStyles.enabled_btn
            } ${addArticleStyles.preview}`}
            type="button"
            handleClick={handlePreview}
            disabled={!article.content}
            content={<img src="/assets/images/eye.svg" alt="preview" />}
          />
          <Btn
            className={`${
              !article.content ||
              !article.categoryName ||
              !article.colorValue ||
              !article.title
                ? addArticleStyles.disabled_btn
                : addArticleStyles.enabled_btn
            } ${addArticleStyles.save}`}
            type="submit"
            disabled={!article.content}
            content={<img src="/assets/images/save.svg" alt="save" />}
          />
        </div>
        <div className="">
          <h3 className="mt-4">Article title</h3>
          <InputField
            handleChange={handleTitleChange}
            placeholder="title"
            className={`p-2 w-100 `}
            inputValue={article.title}
            autoFocus={true}
            type="text"
          />
        </div>
        <h3 className="mt-4">Article Content </h3>
        <TextEditor
          className="mb-4"
          handleEditorChange={handleEditorChange}
          id="article-editor"
          initialValue={article.content}
          value={article.content}
        />
        <h3 className="mt-4">Article Category</h3>
        <div>
          <div className="mt-3">
            <label>Category Name:</label>
            <div className="">
              <InputField
                handleChange={handleCategoryChange}
                placeholder="Category name"
                className={`p-2`}
                inputValue={article.categoryName}
                type="text"
              />
            </div>
          </div>
          <div className="mt-4">
            <label>Category Color [Label]: </label>
            <Picker
              colorValue={article.colorValue}
              handleColorChange={handleColorChange}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default (AddArticle);

// AddArticle.getInitialProps = async (props) => {
//   console.info("##### AddArticle", props);
//   return {};
// };
