import Article from "../Article/Article";

const Preview = ({ articleInfo }) => {
  return articleInfo?.content ? (
    <Article articleInfo={articleInfo} />
  ) : (
    <span>....loading</span>
  );
};

export default Preview;
