import Layout from "./../components/Layout/Layout";
import "../styles/scss/base.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
      <Layout>
        <Component {...pageProps}/>
      </Layout>
  );
};

export default MyApp;
