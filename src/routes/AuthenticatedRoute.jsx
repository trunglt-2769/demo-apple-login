import { Route, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { setUser } from "../pages/Login/login.slice";
import { path } from "../constants/path";

function AuthenticatedGuard({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isCheckToken, setIsCheckToken] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_API_URL}/teacher/teachers/initial_data`, {
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        dispatch(setUser(data.teacher));
        history.replace(path.home);
      })
      .catch((error) => {
        setIsCheckToken(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isCheckToken) return null;

  return (
    <Route {...rest}>
      <Component />
    </Route>
  );
}

export default AuthenticatedGuard;
