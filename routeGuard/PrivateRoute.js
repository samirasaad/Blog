import Router from "next/router";
import { isAuth,parseCookies } from "../utils/helpers";

const PrivateRoute = (WrappedComponent) => {
  const checkUserAuthentication = () => {
    // console.log(parseCookies())
    return { auth: isAuth() };
  };

  const login = "/Login";

  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication();
    console.log(userAuth);
    // if authorized user ?
    if (!userAuth.auth) {
      console.log('privtate')

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
