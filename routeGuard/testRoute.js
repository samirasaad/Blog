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


// PrivateRoute.getInitialProps = async (context) => {
//   const userAuth = await useAuth().isAuth;

//   // Are you an authorized user or not?
//   if (!userAuth) {
//     // Handle server-side and client-side rendering.
//     if (context.res) {
//       context.res?.writeHead(302, {
//         Location: login,
//       });
//       context.res?.end();
//     } else {
//       Router.replace(login);
//     }
//   } else {
//     return   <Component {...props} />
//   }
//   // else if (WrappedComponent.getInitialProps) {
//   //   const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
//   //   return { ...wrappedProps, userAuth };
//   // }

//   return { userAuth };
// };