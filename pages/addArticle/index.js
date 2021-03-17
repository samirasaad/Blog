import React, { useEffect, useState } from "react";
import TextEditor from "../../components/TextEditor/TextEditor";
import { db } from "./../../firebase";
import { ARTICLES } from "./../../utils/constants";
import { useRouter } from "next/router";
import Preview from "../../components/Preview/Preview";
import Picker from "../../components/ColorPicker/ColorPicker";
import Btn from "../../components/controls/Btn/Btn";
import InputField from "../../components/controls/InputField/InputField";
import addArticleStyles from "./addArticle.module.scss";

const AddArticle = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [colorValue, setColorValue] = useState("#f47373");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // check we on browser not server
    if (typeof window !== undefined) {
      if (localStorage.getItem("userInfo")) {
        setUser(JSON.parse(localStorage.getItem("userInfo")));
      }

      if (localStorage.getItem("article")) {
        setContent(JSON.parse(localStorage.getItem("article")).content);
        setTitle(JSON.parse(localStorage.getItem("article")).title);
        setColorValue(JSON.parse(localStorage.getItem("article")).colorValue);
        setCategoryName(
          JSON.parse(localStorage.getItem("article")).categoryName
        );
      }
    }
  }, []);

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handlePreview = () => {
    let articleObj = {
      title,
      content,
      colorValue,
      categoryName,
    };
    localStorage.setItem("article", JSON.stringify(articleObj));
    router.push("/preview");
  };

  const handleColorChange = (e) => {
    setColorValue(e.hex);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategoryName(e.target.value.substring(0, 15));
    // setCategoryName(e.target.value);
  };
  const handleTitleChange = (e) => {
    console.log(e.target.value);
    setTitle(e.target.value.substring(0, 60));
    // setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let timestamp = Math.ceil(new Date().getTime() / 1000).toString();
    let articleObj = {
      content,
      authorID: user.uid,
      timestamp,
      favouritBY: [],
      id: user.uid + "-" + timestamp,
      color: colorValue,
      categoryName,
      title,
      authorName: user.displayName,
      authorPhoto: user.photoURL || "",
    };
    // add to firestore
    await db
      .collection(ARTICLES)
      .doc(user.uid + "-" + timestamp)
      .set(articleObj)
      .then(() => {
        setContent("");
        setCategoryName("");
        setTitle("");
        setColorValue("#f47373");
        localStorage.removeItem("article");
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
              !content || !categoryName || !colorValue || !title
                ? addArticleStyles.disabled_btn
                : addArticleStyles.enabled_btn
            } ${addArticleStyles.preview}`}
            type="button"
            handleClick={handlePreview}
            disabled={!content}
            content={<img src="/assets/images/eye.svg" alt="preview" />}
          />
          <Btn
            className={`${
              !content || !categoryName || !colorValue || !title
                ? addArticleStyles.disabled_btn
                : addArticleStyles.enabled_btn
            } ${addArticleStyles.save}`}
            type="submit"
            disabled={!content}
            content={<img src="/assets/images/save.svg" alt="save" />}
          />
        </div>
        <div className="">
          <h3 className="mt-4">Article title</h3>
          <InputField
            handleChange={handleTitleChange}
            placeholder="title"
            className={`p-2 w-100 `}
            // inputValue={title}
            autoFocus={true}
            type="text"
          />
        </div>
        <h3 className="mt-4">Article Content </h3>
        <TextEditor
          className="mb-4"
          handleEditorChange={handleEditorChange}
          id="text-editor"
          initialValue={content}
          value={content}
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
                // inputValue={categoryName}
                type="text"
              />
            </div>
          </div>
          <div className="mt-4">
            <label>Category Color [Label]: </label>
            <Picker
              colorValue={colorValue}
              handleColorChange={handleColorChange}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddArticle;
