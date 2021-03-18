import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import { signInFirestore } from "./../../firebase/authMethods";
import { USERS } from "./../../utils/constants";
import withPublicRoute from "../../routeGuard/PublicRoute";
import Lottie from "react-lottie";
import LoginLottie from "./../../public/assets/lotties/loginLottie.json";
import Btn from "./../../components/controls/Btn/Btn";
import LoginStyles from "./Login.module.scss";

const Login = () => {
  const router = useRouter();
  const [isUserExist, setIsUserExist] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isUserExist) {
    } else if (!isUserExist && user) {
      storeUser();
    }
  }, [user]);

  const checkUserExistenece = async (user) => {
    // check if existed before
    await db
      .collection(USERS)
      .where("id", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        let users = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        let isExist = users.length > 0;
        setIsUserExist(isExist);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setIsOpen(true);
        // setFirebaseErrMsg(err.message);
      });
  };

  const storeUser = async () => {
    db.collection(USERS)
      .doc(user.uid)
      .set({
        id: user.uid,
        userName: user.displayName,
        photoUrl: user.photoURL,
        userEmail: user.email,
      })
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(user));
        router.push("/");
        // getCurrentUserInfo(user.uid);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setIsOpen(true);
        // setFirebaseErrMsg(err.message);
      });
  };

  const submitLogin = async (e, loginProvider) => {
    e.preventDefault();
    switch (loginProvider) {
      case "google":
        await signInFirestore("google")
          .then((res) => {
            setUser(res.user);
            checkUserExistenece(res.user);
          })
          .catch((err) => {
            // setLoading(false);
            // setIsOpen(true);
            // setFirebaseErrMsg(err.message);
            console.log(err);
          });
        break;

      case "github":
        await signInFirestore("google")
          .then((res) => {
            setUser(res.user);
            checkUserExistenece(res.user);
          })
          .catch((err) => {
            // setLoading(false);
            // setIsOpen(true);
            // setFirebaseErrMsg(err.message);
            console.log(err);
          });
        break;

      default:
        return;
    }
  };

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className={`section-min-height container ${LoginStyles.wrapper}`}>
      <div
        className={`d-flex justify-content-center align-items-center ${LoginStyles.content}`}
      >
        <div>
          <Lottie options={defaultLottieOptions} />
        </div>
        <div
          className={`d-flex flex-column justify-content-center ${LoginStyles.btns}`}
        >
          <Btn
            className={` px-5 py-3 mb-4 mt-5 ${LoginStyles.github}`}
            type="button"
            handleClick={(e) => submitLogin(e, "github")}
            content={
              <div className="d-flex align-items-center">
                <img src="/assets/images/gitHub.svg" className="mx-md-2 mx-0" />
                <p className="mb-0">Continue With Github</p>
              </div>
            }
          />
          <Btn
            className={` px-5 py-3 mb-5 ${LoginStyles.google}`}
            type="button"
            handleClick={(e) => submitLogin(e, "google")}
            content={
              <div className="d-flex align-items-center">
                <img src="/assets/images/google.svg" className="mx-md-2 mx-0" />
                <p className="mb-0">Continue With Google</p>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default withPublicRoute(Login);
