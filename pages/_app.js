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
  // const dispatch = useDispatch();
  const handleRedirect = () => {
    if (
      (!isAuth() && router.pathname === "/Login") ||
      (!isAuth() && router.pathname !== "/Login")
    ) {
      router.push("/Login");
    } else {
      router.push("/Login");
    }
    console.log(router.pathname);
    // dispatch(isAuthReceive(null));
    // Cookies.remove("userInfo");
    return <Login />;
  };

  return (
    <Provider store={store}>
      <Layout>
        {isAuth() && router.pathname !== "/Login" ? (
          <Component {...pageProps} />
        ) : (!isAuth() && router.pathname === "/Login") ||
          (!isAuth() && router.pathname !== "/Login") ? (
          // handleRedirect()
          <Login />
        ) : (
          // handleRedirect()
          <Home />
        )}
      </Layout>
    </Provider>
  );
};

export default MyApp;

// MyApp.getInitialProps = ({ store, Component, ctx }) => {
//   ctx.store.dispatch(isAuthReceive(null));
// };
