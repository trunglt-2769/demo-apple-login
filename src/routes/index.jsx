import { Switch } from "react-router-dom";

import GuardRoute from "./GuardRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { path } from "../constants/path";

export default function Routes() {
  return (
    <Switch>
      <GuardRoute exact path={path.home} component={Home} />
      <AuthenticatedRoute exact path={path.login} component={Login} />
    </Switch>
  );
}
