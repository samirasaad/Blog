import useAuth from "../utils/Auth";
import Login from "./../pages/Login";

const PrivateRoute = (Component) => {
  const renderedComponent = (props) => {
    // If user is not logged in, return login component // doesnt change url
    if (!useAuth().isAuth) {
      return <Login />;
    }
    // If user is logged in, return trying to be visited component
    else {
      return <Component {...props} />;
    }
  };

  return renderedComponent;
};

export default PrivateRoute;
