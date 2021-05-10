import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signInFirestore } from "./../../firebase/authMethods";
import { db } from "../../firebase";
import Lottie from "react-lottie";
import Cookies from "js-cookie";
import { USERS } from "./../../utils/constants";
import LoginLottie from "./../../public/assets/lotties/loginLottie.json";
import { isAuthReceive } from "../../store/actions/auth";
import Btn from "./../../components/controls/Btn/Btn";
import HeadSection from "../../components/HeadSection/HeadSection";
import LoaderComp from "../../components/Loader/Loader";
import Snackbar from "./../../components/Snackbar/Snackbar";
import LoginStyles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isUserExist, setIsUserExist] = useState(false);
  const [user, setUser] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (isUserExist) {
      } else if (!isUserExist && user) {
        storeUser();
      }
    }
    return () => mounted = false;
  }, [user]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setIsSnackbarOpen(false);
      }, 4000);
    }
    return () => mounted = false;
  }, [isSnackbarOpen]);

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
        setGoogleLoading(false);
        setGithubLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGoogleLoading(false);
        setGithubLoading(false);
      });
  };

  const storeUser = async () => {
    db.collection(USERS)
      .doc(user.uid)
      .set({
        id: user.uid,
        userName: user.displayName && user.displayName.toLowerCase(),
        photoUrl: user.photoURL,
        userEmail: user.email,
      })
      .then((res) => {
        Cookies.set("userInfo", user);
        dispatch(isAuthReceive(user));
        router.push("/");
        setGoogleLoading(false);
        setGithubLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setGoogleLoading(false);
        setGithubLoading(false);
      });
  };

  const submitLogin = async (e, loginProvider) => {
    e.preventDefault();
    switch (loginProvider) {
      case "google":
        setGoogleLoading(true);
        await signInFirestore("google")
          .then((res) => {
            setUser(res.user);
            checkUserExistenece(res.user.providerData[0]);
            setIsSnackbarOpen(false);
          })
          .catch((err) => {
            setGoogleLoading(false);
            setIsSnackbarOpen(true);
            setErrMsg(err.code);
            console.log(err);
          });
        break;
      case "github":
        setGithubLoading(true);
        await signInFirestore("github")
          .then((res) => {
            setUser(res.user);
            checkUserExistenece(res.user.providerData[0]);
            setIsSnackbarOpen(false);
          })
          .catch((err) => {
            setGithubLoading(false);
            setIsSnackbarOpen(true);
            setErrMsg(err.code);
            console.log(err);
          });
        break;
      default:
        return;
    }
  };

  return (
    <section className={`section-min-height container ${LoginStyles.wrapper}`}>
      <HeadSection
        title="Blog | Login"
        metadata={[
          {
            name: "description",
            content: "Next.js blog app react, next js and firebase",
          },
          {
            name: "keywords",
            content:
              "HTML, CSS, CSS3, JavaScript, react, redux, react-redux, firebase, firestore",
          },
          { name: "author", content: "Samira Saad" },
        ]}
        links={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <Snackbar isOpen={isSnackbarOpen} msg={errMsg} type="error" />
      <div
        className={`d-flex justify-content-center align-items-center mt-4 ${LoginStyles.content}`}
      >
        <div>
          <Lottie options={defaultLottieOptions} />
        </div>
        <div
          className={`d-flex flex-column justify-content-center ${LoginStyles.btns}`}
        >
          {githubLoading ? (
            <div className="d-flex justify-content-center mb-5 mt-2">
              <LoaderComp />
            </div>
          ) : (
            <Btn
              className={` px-5 py-3 mb-4 mt-5 ${LoginStyles.github}`}
              type="button"
              handleClick={(e) => submitLogin(e, "github")}
              content={
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/images/gitHub.svg"
                    className="mx-md-2 mx-0"
                    alt="github"
                  />
                  <p className="mb-0">Continue With Github</p>
                </div>
              }
            />
          )}
          {googleLoading ? (
            <div className="d-flex justify-content-center mb-5 mt-2">
              <LoaderComp />
            </div>
          ) : (
            <Btn
              className={` px-5 py-3 mb-5 ${LoginStyles.google}`}
              type="button"
              handleClick={(e) => submitLogin(e, "google")}
              content={
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/images/google.svg"
                    className="mx-md-2 mx-0"
                    alt="google"
                  />
                  <p className="mb-0">Continue With Google</p>
                </div>
              }
            />
          )}
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default Login;
// export default withTestPublicRoute(Login);
