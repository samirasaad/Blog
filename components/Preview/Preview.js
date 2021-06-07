import Article from "../../components/Article/Article";
import Btn from "../../components/controls/Btn/Btn";
import ArticleCover from "../ArticleCover/ArticleCover";
import TooltipComp from "../TooltipComp/TooltipComp";
import previewStyles from "./preview.module.scss";

const Preview = ({ handleEdit, user, articleInfo }) => {
  const renderPreview = () => (
    <>
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
      {/* ARTICLE COVER */}
      <ArticleCover img={articleInfo.coverImg} />
      {/* ARTICLE TEMPLATE */}
      <Article articleInfo={articleInfo} user={user} />
    </>
  );
  return (
    <section className="container section-min-height">
      {articleInfo && renderPreview()}
    </section>
  );
};

export default Preview;
