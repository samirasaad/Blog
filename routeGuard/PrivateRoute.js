import Router from "next/router";
import { useEffect } from "react";
import { isAuth } from "../utils/helpers";

const PrivateRoute = (WrappedComponent) => {
  const checkUserAuthentication = () => {
    return { auth: null };
  };

  const login = "/Login";

  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication();

    // if authorized user ?
    if (!userAuth?.auth) {
      // Handle server-side & client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
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

export default PrivateRoute;
