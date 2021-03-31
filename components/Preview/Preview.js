import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Article from "../../components/Article/Article";
import Btn from "../../components/controls/Btn/Btn";
import previewStyles from "./preview.module.scss";

const Preview = ({ handleEdit }) => {
  const router = useRouter();
  const [articleInfo, setArticleInfo] = useState("");

  useEffect(() => {
    Cookies.get("article") &&
      setArticleInfo(JSON.parse(Cookies.get("article")));
  }, []);

  return (
    <section className="container section-min-height">
      <div className="d-flex justify-content-end my-5 mx-3">
        <Btn
          className={`px-0 ${previewStyles.edit}`}
          handleClick={handleEdit}
          content={<img src="/assets/images/edit.svg" alt="edit" />}
        />
      </div>
      {articleInfo && <Article articleInfo={articleInfo} />}
    </section>
  );
};

export default Preview;
