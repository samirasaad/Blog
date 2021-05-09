import React, { useEffect, useState } from "react";
import { db } from "./../../firebase";
import Cookies from "js-cookie";
import { ARTICLES } from "./../../utils/constants";
import TextEditor from "../../components/TextEditor/TextEditor";
import InputField from "../../components/controls/InputField/InputField";
import Picker from "../../components/ColorPicker/ColorPicker";
import HeadSection from "../../components/HeadSection/HeadSection";
import Btn from "../../components/controls/Btn/Btn";
import Snackbar from "../../components/Snackbar/Snackbar";
import LoaderComp from "../../components/Loader/Loader";
import Preview from "./../../components/Preview/Preview";
import TooltipComp from "./../../components/TooltipComp/TooltipComp";
import addArticleStyles from "./addArticle.module.scss";

const AddArticle = () => {
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [user, setUser] = useState({});
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const [article, setArticle] = useState({
    content: "",
    title: "",
    colorValue: "#f47373",
    categoryName: "",
  });

  useEffect(() => {
    let articleStoredData = null;
    if (typeof window !== undefined) {
      if (Cookies.get("userInfo")) {
        setUser(JSON.parse(Cookies.get("userInfo")));
      }
      articleStoredData = JSON.parse(localStorage.getItem("article"));
    }

    if (articleStoredData) {
      setArticle({
        content: articleStoredData.content,
        title: articleStoredData.title,
        colorValue: articleStoredData.colorValue,
        categoryName: articleStoredData.categoryName,
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSnackbarOpen(false);
    }, 4000);
  }, [isSnackbarOpen]);

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
    localStorage.setItem("article", JSON.stringify(articleObj));
    setIsPreview(true);
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
    setLoading(true);
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
      authorName: user && user.displayName && user.displayName.toLowerCase(),
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
        localStorage.removeItem("article");
        setLoading(false);
        setIsSnackbarOpen(true);
        setMsg("Article Published successfully");
        setType("sucess");
      })
      .catch((err) => {
        console.log(err);
        setIsSnackbarOpen(true);
        setLoading(false);
        setMsg(err.code);
        setType("error");
      });
  };

  const handleEdit = () => {
    setIsPreview(false);
  };

  return (
    <section className="container section-min-height">
      <HeadSection
        title="Blog | Add article"
        metadata={[
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
      />
      <Snackbar isOpen={isSnackbarOpen} msg={msg} type={type} />
      <h1 className={`mt-4 font-weight-bold ${addArticleStyles.title}`}>
        Article Details
      </h1>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <LoaderComp />
        </div>
      ) : !loading && !isPreview ? (
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-end mb-3">
            {article.content &&
              article.categoryName &&
              article.colorValue &&
              article.title && (
                <TooltipComp
                  id="preview"
                  place="top"
                  effect="solid"
                  type="info"
                />
              )}
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
              content={
                <img
                  data-for="preview"
                  data-tip="Preview"
                  src="/assets/images/eye.svg"
                  alt="preview"
                />
              }
            />
            {article.content &&
              article.categoryName &&
              article.colorValue &&
              article.title && (
                <TooltipComp
                  id="publish"
                  place="top"
                  effect="solid"
                  type="info"
                />
              )}
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
              content={
                <img
                  data-for="publish"
                  data-tip="Publish"
                  src="/assets/images/save.svg"
                  alt="save"
                />
              }
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
      ) : (
        !loading &&
        isPreview && (
          <Preview
            handleEdit={handleEdit}
            user={user}
            articleInfo={{
              title: article.title,
              content: article.content,
              colorValue: article.colorValue,
              categoryName: article.categoryName,
            }}
          />
        )
      )}
    </section>
  );
};

export default AddArticle;