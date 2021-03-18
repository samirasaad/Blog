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
