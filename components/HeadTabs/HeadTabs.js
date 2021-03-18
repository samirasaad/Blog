import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import MyArticles from "../MyArticles/MyArticles";
import MyFavorites from "../MyFavorites/MyFavorites";

const HeadTabs = ({
  user,
  myArticlesList,
  myFavoritesList,
  deleteArticle,
  addToFavourites,
}) => (
  <Tabs>
    <TabList>
      <Tab>My Articles </Tab>
      <Tab>My Favorites</Tab>
    </TabList>

    <TabPanel>
      <MyArticles
        user={user}
        deleteArticle={deleteArticle}
        myArticlesList={myArticlesList}
      />
    </TabPanel>
    <TabPanel>
      <MyFavorites user={user} myFavoritesList={myFavoritesList} />
    </TabPanel>
  </Tabs>
);

export default HeadTabs;
