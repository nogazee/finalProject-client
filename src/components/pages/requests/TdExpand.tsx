import { useState } from "react";
import classes from "./TdExpand.module.css";

const TdExpand: React.FC<{ text: string }> = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const charactersLimit = 20;

  const onClickHandler = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  return (
    <>
      {props.text.length < charactersLimit ? (
        <td>{props.text}</td>
      ) : (
        <td>
          {isClicked
            ? props.text
            : props.text.substring(0, charactersLimit) + "..."}
          <p className={classes.action} onClick={onClickHandler}>
            {isClicked ? "Show Less" : "Show More"}
          </p>
        </td>
      )}
    </>
  );
};

export default TdExpand;
