import Router from "next/router";
import NProgress from "nprogress"; 
import "nprogress/nprogress.css"; 
//Binding events to display loader on router change
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import { Provider } from "react-redux";
import Layout from "./../components/Layout/Layout";
import store from "./../store";
import "../styles/scss/base.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
