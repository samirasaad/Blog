import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Article from "../../components/Article/Article";
import Btn from "../../components/controls/Btn/Btn";
import previewStyles from "./preview.module.scss";
import TooltipComp from "../TooltipComp/TooltipComp";

const Preview = ({ handleEdit, user }) => {
  const [articleInfo, setArticleInfo] = useState("");

  useEffect(() => {
    Cookies.get("article") &&
      setArticleInfo(JSON.parse(Cookies.get("article")));
  }, []);

  return (
    <section className="container section-min-height">
      <div className="d-flex justify-content-end my-5 mx-3">
        <TooltipComp id="edit" place="top" effect="solid" type="info" />

        <Btn
          className={`px-0 ${previewStyles.edit}`}
          handleClick={handleEdit}
          content={
            <img
              data-for="edit"
              data-tip="Edit"
              src="/assets/images/edit.svg"
              alt="edit"
            />
          }
        />
      </div>
      {articleInfo && <Article articleInfo={articleInfo} user={user} />}
    </section>
  );
};

export default Preview;
