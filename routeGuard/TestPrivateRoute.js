import {isAuth} from "../utils/helpers";
import Login from "./../pages/Login";
import Router from "next/router";


const TestPrivateRoute = (Component) => {
  const renderedComponent = (props) => {
    if (!isAuth()) {
      console.log()
      // Router.replace('/Login')
      return <Login />;
    }
    else {
      return <Component {...props} />;
    }
  };

  return renderedComponent;
};

export default TestPrivateRoute;
