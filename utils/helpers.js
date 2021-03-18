export const isAuth = () => {
    return localStorage.getItem("userInfo") ? true : false;
  };
export const logout = () => {
localStorage.clear()
};
