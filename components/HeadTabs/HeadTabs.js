import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LoaderComp from "../Loader/Loader";
import MyArticles from "../MyArticles/MyArticles";
import MyFavorites from "../MyFavorites/MyFavorites";
import "react-tabs/style/react-tabs.css";

const HeadTabs = ({
  loading,
  user,
  myArticlesList,
  myFavoritesList,
  deleteArticle,
}) => (
  <Tabs>
    <TabList>
      <Tab>My Articles </Tab>
      <Tab>My Favorites</Tab>
    </TabList>
    <TabPanel>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <LoaderComp />
        </div>
      ) : (
        <MyArticles
          user={user}
          deleteArticle={deleteArticle}
          myArticlesList={myArticlesList}
        />
      )}
    </TabPanel>
    <TabPanel>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <LoaderComp />
        </div>
      ) : (
        <MyFavorites user={user} myFavoritesList={myFavoritesList} />
      )}
    </TabPanel>
  </Tabs>
);

export default HeadTabs;
