import {isAuth} from "../utils/helpers";
import Home from "./../pages";
import Router from "next/router";


const TestPublicRoute = (Component) => {
  const renderedComponent = (props) => {
    if (isAuth()) {
      console.log()
      // Router.replace('/Login')
      return <Home />;
    }
    else {
      return <Component {...props} />;
    }
  };

  return renderedComponent;
};

export default TestPublicRoute;

TestPublicRoute.getInitialProps = (ctx) => {
  if(typeof window === 'undefined'){
    res.redirect('/')
    res.end()
    return {}
  }
  console.log(ctx)
  console.log(isAuth())
  
  Router.push('/')
  return {}
}