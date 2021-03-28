import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { isAuthReceive } from "./../../store/actions/auth";
import { isAuth, logout } from "./../../utils/helpers";
import ConfirmatiomDialog from "../ConfirmatiomDialog/ConfirmatiomDialog";
import NavBarStyles from "./NavBar.module.scss";

const NavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState({});
  const isAuthnticatedUser = useSelector(
    ({ isAuthnticatedUser }) => isAuthnticatedUser
  );

  useEffect(() => {
    setUser(Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : {});
  }, []);

  const handleLogout = () => {
    logout();
    dispatch(isAuthReceive(null));
    setUser({});
    // clear cookies
    Cookies.remove("userInfo");
    // search for redirection from not next js component
    router.push("/Login");
    console.log(isAuth);
    console.log(isAuthnticatedUser.user);
  };

  return (
    <div
      className={`d-flex justify-content-between align-items-center ${NavBarStyles.nav}`}
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
        <div
          className={`d-flex align-items-center mt-2 ${NavBarStyles.wrapper}`}
        >
          <div className="d-flex justify-content-center"></div>
          <div className="d-flex align-items-center">
            <Link href="/">
              <a className={` mx-3 ${NavBarStyles.item}`}>All</a>
            </Link>
            {isAuth() || isAuthnticatedUser.user ? (
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
                <div className="d-flex flex-column">
                  <Link href="/profile">
                    <a className="mx-3">
                      <img
                        src={
                          user && user.photoURL
                            ? user.photoURL
                            : isAuthnticatedUser.user &&
                              isAuthnticatedUser.user.photoURL
                            ? isAuthnticatedUser.user.photoURL
                            : "/assets/images/placeholder.jpg"
                        }
                        className="profile-img-small"
                      />
                    </a>
                  </Link>
                  <span className={NavBarStyles.name}>
                    {(user && user.displayName) ||
                      (isAuthnticatedUser.user &&
                        isAuthnticatedUser.user.displayName)}
                  </span>
                </div>
                <ConfirmatiomDialog
                  className={` ${NavBarStyles.logout}`}
                  dialogTitle="Are You Sure You Want To Logout ?"
                  cancelText="No"
                  confirmText="Log out"
                  handleConfirm={handleLogout}
                  clickableItem={
                    <img
                      src="/assets/images/logout.png"
                      alt="logout"
                      className="mx-1"
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
