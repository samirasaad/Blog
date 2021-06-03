import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Router from "next/router";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import { isAuth } from "../utils/helpers";
import Home from ".";
import Login from "./Login";
import Layout from "./../components/Layout/Layout";
import store from "./../store";
import "nprogress/nprogress.css";
import "../styles/scss/base.scss";

//Binding events to display loader on router change
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname) {
      if (!isAuth() && router.pathname === "/Login") {
        router.push("/Login");
      } else if (
        (!isAuth() && router.pathname === "/addArticle") || 
        (!isAuth() && router.pathname === "/profile") || 
        (isAuth() && router.pathname === "/Login")
      ) {
        router.push("/");
      } else {
        return;
      }
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
