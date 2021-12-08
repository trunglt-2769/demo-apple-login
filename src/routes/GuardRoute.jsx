import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";

import { isAuthenticatedSelector, setUser } from "../pages/Login/login.slice";
import { path } from "../constants/path";

const GuardRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) return;

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
      })
      .catch((error) => {
        history.replace(path.login);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) return null;

  return (
    <Route {...rest}>
      <Component />
    </Route>
  );
};
export default GuardRoute;
