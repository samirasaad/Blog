import Home from "./../pages";
import useAuth from "../utils/Auth";

const publicRoute = (Component) => {
  const renderedComponent = (props) => {
    console.log(useAuth().isAuth)
    if (useAuth().isAuth) {
      return <Home />;
    }
    else {
      return <Component {...props} />;
    }
  };

  return renderedComponent;
};
export default publicRoute;
