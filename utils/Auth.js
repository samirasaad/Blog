import { useEffect, useState } from "react";

const useAuth = () =>{
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    setIsAuth(localStorage.getItem("userInfo"));
  });

  return {
    isAuth,
  };
}

export default useAuth;
