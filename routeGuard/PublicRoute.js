import Router from "next/router";
import { useEffect } from "react";
import { isAuth, parseCookies } from "../utils/helpers";
import useAuth from "../utils/Auth";

const PublicRoute = (WrappedComponent) => {
  const checkUserAuthentication = () => {
    console.log(isAuth())
    return { auth: isAuth() };
  };

  const home = "/";

  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication();
    // if authorized user ?
    if (userAuth.auth) {
      console.log('yess')
      // Handle server-side & client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: home,
        });
        context.res?.end();
      } else {
        Router.replace(home);
        Router.push(home);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userAuth,
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};

export default PublicRoute;
