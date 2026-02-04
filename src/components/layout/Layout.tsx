import type { PropsWithChildren } from "react";
import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation.tsx";

const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className={classes.wrapper}>
      <MainNavigation />
      <main className={classes.main}>
        <div className={classes["main-content"]}>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;
