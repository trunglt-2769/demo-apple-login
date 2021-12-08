import { useHistory } from "react-router-dom";
import Button from "../../component/Button";
import cookie from "../../utils/cookie";

import styles from "./styles.module.css";

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    const options = { method: "POST" };
    fetch(`${process.env.REACT_APP_BASE_API_URL}/teacher/teachers/logout`, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        cookie.deleteAll();
        history.replace("/login");
      })
      .catch((error) => {});
  };

  return (
    <div className={`${styles.container}`}>
      <h1>Home</h1>
      <Button color={"gray"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
