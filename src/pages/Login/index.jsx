import { useCallback, useEffect, useState } from "react";
import AppleLogin from "react-apple-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

import cookie, { cookieNames } from "../../utils/cookie";
import { setUser } from "./login.slice";
import { path } from "../../constants/path";

import styles from "./styles.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const [nonce, setNonce] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_API_URL}/teacher/teachers/nonce`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setNonce(data.nonce_id);
      })
      .catch((error) => {});
  }, []);

  const handleLoginSuccess = useCallback((data) => {
    cookie.set(cookieNames.teacher_session_id, data.teacher_session_id, 365);
    if (data.manager_session_id) cookie.set(cookieNames.manager_session_id, data.manager_session_id, 365);
    if (params.redirect_to) {
      switch (params.redirect_to) {
        case "dlp": {
          window.location.href = `${process.env.REACT_APP_DLP_URL}`;
          return;
        }
        case "gear": {
          window.location.href = `${process.env.REACT_APP_GEAR_URL}`;
          return;
        }
        default: {
          if (data.manager_session_id) {
            window.location.href = `${process.env.REACT_APP_MANAGER_URL}`;
            return;
          }
          alert("アカウントにManagerアプリへのアクセスが許可されていません");
          dispatch(setUser(data.teacher));
          history.push(path.home);
          return;
        }
      }
    } else {
      dispatch(setUser(data.teacher));
      history.push(path.home);
    } // eslint-disable-next-line
  }, []);

  const handleLoginApple = useCallback(async (response) => {
    console.log(response);
    try {
      if (response.idToken) {
        const options = {
          method: "POST",
          body: JSON.stringify({ access_token: response.idToken }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        fetch(`${process.env.REACT_APP_BASE_API_URL}/teacher/teachers/login_apple`, options)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => handleLoginSuccess(data))
          .catch((error) => {});
      }
    } catch (err) {} // eslint-disable-next-line
  }, []);

  return (
    <div className={`${styles.container}`}>
      <h1>Login</h1>
      <AppleLogin
        clientId={process.env.REACT_APP_ACI}
        redirectURI={process.env.REACT_APP_BASE_URL}
        usePopup={true}
        nonce={nonce}
        callback={handleLoginApple}
      />
    </div>
  );
};

export default Login;
