import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Button from "../UI/Button";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userRole = authCtx.userRole;
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <Link to="/requests" className={classes.logo}>
        <div>בים בם ב"מ</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
              {userRole === "ADMIN" && (
                <li className={classes.dropdown}>
                  <Button>Manage Requests</Button>
                  <div className={classes["dropdown-content"]}>
                    <Link to="/manage/history">Requests History</Link>
                    <Link to="/manage/pending">Pending Requests</Link>
                  </div>
                </li>
              )}
              <li>
                <Link to="/requests">My Requests</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Button onClick={logoutHandler} className={classes.logoutbtn}>
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
