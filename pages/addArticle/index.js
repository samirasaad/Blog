import React, { useEffect, useState } from "react";
import { db, storage } from "./../../firebase";
import Cookies from "js-cookie";
import { ARTICLES, IMAGES } from "./../../utils/constants";
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
    coverImg: null,
    colorValue: "#f47373",
    categoryName: "",
  });
  const [downloadedUrl, setDownloadedUrl] = useState(null);
  const [imgBase64, setImgBase64] = useState("");
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    fileName: "",
    fileSize: 0,
    fileType: "",
  });
  const [fileErr, setFileErr] = useState({
    sizeErr: false,
    typeErr: false,
    msg: "",
  });
  const fileSupportedFormats = [
    "image/JPEG",
    "image/JPG",
    "image/jpg",
    "image/png",
    "image/PNG",
    "image/JPEG",
    "image/jpeg",
    "image/SVG+XML",
    "image/svg+xml",
  ];
  const fileSize = 1; //1MB

  useEffect(() => {
    let articleStoredData = null;
    if (typeof window !== undefined) {
      if (Cookies.get("userInfo")) {
        setUser(JSON.parse(Cookies.get("userInfo")));
      }
      articleStoredData = JSON.parse(localStorage.getItem("article"));
    }
    if (articleStoredData) {
      setImgBase64(articleStoredData.coverImg);
      setArticle({
        content: articleStoredData.content,
        title: articleStoredData.title,
        colorValue: articleStoredData.colorValue,
        categoryName: articleStoredData.categoryName,
        coverImg: articleStoredData.coverImg,
      });
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setIsSnackbarOpen(false);
      }, 4000);
    }
    return () => (mounted = false);
  }, [isSnackbarOpen]);

  const handleEdit = () => {
    setIsPreview(false);
  };

  const handleEditorChange = (content, editor) => {
    setArticle({ ...article, content });
  };

  const handlePreview = () => {
    let articleObj = {
      title: article.title,
      content: article.content,
      colorValue: article.colorValue,
      categoryName: article.categoryName,
      coverImg: imgBase64,
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

  /********************************* END HANDLING IMG ************************/
  const onFileChange = (event) => {
    setImgBase64("");
    setFileErr({ typeErr: false, sizeErr: false });
    setSelectedFile({
      file: event.target.files[0],
      fileName: event.target.files[0]?.name,
      fileSize: event.target.files[0]?.size, //size in bytes
      fileType: event.target.files[0]?.type,
      // result: null,
    });
    checkSelectedFileValidation(event);
  };

  const checkSelectedFileValidation = (event) => {
    if (event.target.files[0]) {
      setFileErr({
        typeErr: !fileSupportedFormats.includes(event.target.files[0].type),
        sizeErr: event.target.files[0].size / 1024 / 1024 > fileSize,
        msg: !fileSupportedFormats.includes(event.target.files[0].type)
          ? "Image type is not supported svg, jpg, jpeg and png only"
          : event.target.files[0].size / 1024 / 1024 > fileSize
          ? "Image size is too large, maximum 1 Mb"
          : "",
      });
      if (
        fileSupportedFormats.includes(event.target.files[0].type) &&
        event.target.files[0].size / 1024 / 1024 < fileSize
      ) {
        viewImageHandler(event.target.files[0]);
      }
    }
  };

  const getfirestoreArticleCover = async (time) => {
    setLoading(true);
    await storage
      .ref(IMAGES)
      .child(`${user.uid}-${time}`)
      .getDownloadURL()
      .then((imgUrl) => {
        console.log(imgUrl);
        // localStorage.setItem("isDark", false);
        // localStorage.setItem("isAuthnticated", true);
        // localStorage.setItem("userPic", imgUrl);
        // localStorage.setItem("userID", currentUser.id);
        // localStorage.setItem(
        //   "userFullName",
        //   currentUser.displayName
        //     ? currentUser.displayName
        //     : formValues.userName.trim().charAt(0).toUpperCase() +
        //         formValues.userName.slice(1)
        // );
        setDownloadedUrl(imgUrl);
      })
      .catch((err) => {
        // setIsOpen(true);
        // setFirebaseErrMsg(err.message);
      });
  };

  const storePhotoUrlInFirestoreStorage = async () => {
    let timestamp = Math.ceil(new Date().getTime() / 1000).toString();

    setLoading(true);
    await storage
      .ref(`/${IMAGES}/${user.uid}-${timestamp}`)
      .put(selectedFile.file)
      .then(() => {
        getfirestoreArticleCover(timestamp)
       
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const viewImageHandler = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImgBase64(e.target.result);
      setArticle({ ...article, coverImg: e.target.result });
    };
  };

  const handleRemove = () => {
    setImgBase64("");
    setFileErr({ typeErr: false, sizeErr: false });
    setSelectedFile({
      file: null,
      fileName: "",
      fileType: "",
      fileSize: 0,
      coverImg: null,
    });
  };

  useEffect(()=>{
    if(downloadedUrl){
      handleSubmit()
    }
  },[downloadedUrl])
  /********************************* END HANDLING IMG ************************/

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);
    let timestamp = Math.ceil(new Date().getTime() / 1000).toString();
    let articleObj = {
      content: article.content,
      authorID: user.uid,
      favouritBY: [],
      id: user.uid + "-" + timestamp,
      color: article.colorValue,
      categoryName: article.categoryName,
      title: article.title,
      authorName: user && user.displayName && user.displayName.toLowerCase(),
      authorPhoto: user.photoURL || "",
      coverImg:downloadedUrl
    };
    // add article object to firestore
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
          coverImg: null,
        });
        setImgBase64(null);
        localStorage.removeItem("article");
         setLoading(false);
        setIsSnackbarOpen(true);
        setMsg("Article Published successfully");
        setType("sucess");
        // storePhotoUrlInFirestoreStorage(user.uid, timestamp);
      })
      .catch((err) => {
        console.log(err);
        setIsSnackbarOpen(true);
        setLoading(false);
        setMsg(err.code);
        setType("error");
      });
  };

  const renderArticleForm = () => (
    <form onSubmit={storePhotoUrlInFirestoreStorage}>
      <div className="d-flex justify-content-end mb-3">
        {imgBase64 &&
          article.coverImg &&
          article.content &&
          article.categoryName &&
          article.colorValue &&
          article.title && (
            <TooltipComp id="preview" place="top" effect="solid" type="info" />
          )}
        <Btn
          className={`${
            !imgBase64 ||
            !article.coverImg ||
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
        {imgBase64 &&
          article.coverImg &&
          article.content &&
          article.categoryName &&
          article.colorValue &&
          article.title && (
            <TooltipComp id="publish" place="top" effect="solid" type="info" />
          )}
        <Btn
          className={`${
            !imgBase64 ||
            !article.coverImg ||
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
      {/* ARTICLE TITLE */}
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
      {/* ARTICLE COVER */}
      <div className="flex my-4 flex-column">
        {(!fileErr.typeErr && !fileErr.sizeErr && !imgBase64) || !imgBase64 ? (
          <label className="upload-btn my-4 w-50 m-auto flex-column d-flex  mt-3 justify-content-center">
            <InputField
              type="file"
              name="image"
              // value={article.coverImg}
              handleChange={onFileChange}
            />
            <div className="label-content mb-4 d-flex justify-content-center align-items-center flex-column">
              <img
                className={`${addArticleStyles.upload}`}
                data-for="upload"
                data-tip="upload"
                src="/assets/images/upload.svg"
                alt="upload"
              />
            </div>
          </label>
        ) : (
          imgBase64 &&
          !fileErr.typeErr &&
          !fileErr.sizeErr && (
            <>
              {/* <p className="text-center m-2 bold-font seleceted-img-name">
                {selectedFile.fileName}
              </p> */}
              <div className="upload-btn w-50 m-auto d-flex justify-content-center position-relative">
                <span className={``} onClick={handleRemove}>
                  <img
                    className={`position-absolute ${addArticleStyles.remove}`}
                    src="assets/images/cancel.svg"
                  />
                </span>
                <img
                  className={`${addArticleStyles.displayed_img}`}
                  src={imgBase64}
                />
              </div>
            </>
          )
        )}

        {fileErr.msg && (
          <p className="mb-2 mx-2 text-danger text-center">{fileErr.msg}</p>
        )}
      </div>
      {/* //////////////////////////////////////////////////////////////////////////////// */}
      {/* ARTICLE CONTENT */}
      <h3 className="mt-4">Article Content </h3>
      <TextEditor
        className="mb-4"
        handleEditorChange={handleEditorChange}
        id="article-editor"
        initialValue={article.content}
        value={article.content}
      />
      {/* ARTICLE CATEGORY */}
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
          <label>
            Category Color [Label]:
            <span
              className="text-white category-label mx-3 p-2 "
              style={{ backgroundColor: `${article.colorValue}` }}
            >
              {article.colorValue}
            </span>
          </label>
          <Picker
            colorValue={article.colorValue}
            handleColorChange={handleColorChange}
          />
        </div>
      </div>
    </form>
  );

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
        renderArticleForm()
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
              coverImg: imgBase64,
            }}
          />
        )
      )}
    </section>
  );
};

export default AddArticle;
