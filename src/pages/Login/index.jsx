import { useCallback, useEffect, useState } from "react";
import AppleSignin from "react-apple-signin-auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import cookie, { cookieNames } from "../../utils/cookie";
import { setUser } from "./login.slice";
import { path } from "../../constants/path";

import styles from "./styles.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
    dispatch(setUser(data.teacher));
    history.push(path.home); // eslint-disable-next-line
  }, []);

  const handleLoginApple = useCallback(async (response) => {
    try {
      if (response?.authorization?.id_token) {
        const options = {
          method: "POST",
          body: JSON.stringify({ access_token: response.authorization.id_token }),
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
      <AppleSignin
        authOptions={{
          clientId: process.env.REACT_APP_ACI,
          scope: "email name",
          redirectURI: process.env.REACT_APP_BASE_URL,
          nonce,
          usePopup: true,
        }}
        uiType="dark"
        className="apple-auth-btn"
        noDefaultStyle={false}
        buttonExtraChildren="Continue with Apple"
        onSuccess={handleLoginApple}
        onError={handleLoginApple}
        skipScript={false}
        iconProp={{ style: { marginTop: "10px" } }}
      />
    </div>
  );
};

export default Login;
