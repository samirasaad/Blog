import React, { useEffect, useState } from "react";

const useAuth = () =>{
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    setIsAuth(localStorage.getItem("userInfo"));
  });

// const logout = () =>{
//   console.log('logout clicked')
// }

  return {
    isAuth,
    // logout
  };
}

export default useAuth;

// useAuth.getInitialProps = async ({ req }) => {
//   const cookiesData = parseCookies(req);
//   if (Object.keys(cookiesData).length === 0 && cookiesData.constructor === Object) {
//     res.writeHead(301, { Location: "/" });
//     res.end();
//   }

//   return {
//     cookiesData: cookiesData && cookiesData,
//   };
// };