import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "./../../utils/helpers";
import NavBarStyles from "./NavBar.module.scss";
import FloatingSearchBar from "../FloatingSearchBar/FloatingSearchBar";
import ConfirmatiomDialog from "../ConfirmatiomDialog/ConfirmatiomDialog";
import { db } from "../../firebase";
import { ARTICLES } from "../../utils/constants";

const NavBar = () => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setIsAuth(window.localStorage.getItem("userInfo"));
    setUser(JSON.parse(window.localStorage.getItem("userInfo")));
  }, []);

  const handleLogout = () => {
    logout();
    // search for redirection from not next js component
    router.push("/Login");
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      db.collection(ARTICLES)
        .where("authorName", ">=", searchValue) //name contains the search value
        .onSnapshot(
          (querySnapshot) => {
            let articles = querySnapshot.docs.map((doc) => {
              return doc.data();
            });
            console.log(articles);
            // setMyArticlesList(articles);
          },
          (error) => {
            console.log(error);
          }
        );

      console.log("submit", "searchvalue", searchValue);
    }
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
        <div className={`d-flex align-items-center mt-2 ${NavBarStyles.wrapper}`}>
          <div className="d-flex justify-content-center">
            <FloatingSearchBar
              handleSearchChange={handleSearchChange}
              handleSubmitSearch={handleSubmitSearch}
              searchValue={searchValue}
            />
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
                <div className="d-flex flex-column">
                  <Link href="/profile">
                      <a className="mx-3">
                        <img
                          src={
                            user.photoURL
                              ? user.photoURL
                              : "/assets/images/placeholder.jpg"
                          }
                          className="profile-img-small"
                        />
                      </a>
                  </Link>
                  <span className={NavBarStyles.name}>{user.displayName}</span>
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
