import { useEffect, useState } from "react";
import Link from "next/link";
import Btn from "./../../components/controls/Btn/Btn";
import { logout } from "./../../utils/helpers";
import NavBarStyles from "./NavBar.module.scss";
import FloatingSearchBar from "../FloatingSearchBar/FloatingSearchBar";

const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsAuth(window.localStorage.getItem("userInfo"));
    setUser(JSON.parse(window.localStorage.getItem("userInfo")));
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`d-flex justify-content-between align-items-center mb-5 ${NavBarStyles.nav}`}
    >
      <div className="position-relative">
        <Link href="/">
          <a>
            <img
              src={`/assets/images/logo.jpg`}
              height="100"
              width="100"
              className={`mx-3 ${NavBarStyles.logo}`}
            />

            <h4
              className={` font-weight-bold position-absolute bold-font ${NavBarStyles.brand}`}
            >
              Blog
            </h4>
          </a>
        </Link>
      </div>
      <div
        className={`d-flex justify-content-between align-items-center mb-2 ${NavBarStyles.items}`}
      >
        <div className={`d-flex ${NavBarStyles.wrapper}`}>
          <div className="d-flex justify-content-center">
            <FloatingSearchBar />
          </div>
          <div className="d-flex align-items-center">
            <Link href="/">
              <a className={` mx-3 ${NavBarStyles.item}`}>All</a>
            </Link>
            {isAuth ? (
              <>
                <Link href="/addArticle">
                  <a className="mx-3">
                    <img
                      src="/assets/images/plus.svg"
                      alt="add"
                      className={`${NavBarStyles.add}`}
                    />
                  </a>
                </Link>
                <Link href="/profile">
                  <a className="mx-3">
                    <img
                      src={
                        user.photoURL
                          ? user.photoURL
                          : "/assets/images/placeholder.jpg"
                      }
                      className="profile-img-medium"
                    />
                  </a>
                </Link>
                <Btn
                  handleClick={handleLogout}
                  content={
                    <img
                      src="/assets/images/logout.png"
                      alt="logout"
                      className={NavBarStyles.logout}
                    />
                  }
                />
              </>
            ) : (
              <Link href="/Login">
                <a className="mx-3">Log In</a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
