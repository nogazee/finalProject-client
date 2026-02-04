import { useState, type ChangeEvent } from "react";
import ReactDOM from "react-dom";
import Card from "../../UI/Card";
import InputField from "../../auth/InputField";
import useInput from "../../../hooks/use-input";
import classes from "./AddRequests.module.css";
import Button from "../../UI/Button";

const valueValidator = (value: string) => {
  return value.trim() !== "";
};

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const AddRequest: React.FC<{
  closeOverlay: () => void;
  onSubmit: (reqData: {
    type: string;
    title: string;
    description: string;
  }) => void;
}> = (props) => {
  const [selectedType, setSelectedType] = useState("");

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: titleReset,
  } = useInput(valueValidator);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: descriptionReset,
  } = useInput(valueValidator);

  const typeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  let formIsValid = false;
  if (titleIsValid && descriptionIsValid && selectedType !== "") {
    formIsValid = true;
  }

  const submitHandler = async () => {
    if (!formIsValid) {
      return;
    }

    const reqData = {
      type: selectedType,
      title: titleValue,
      description: descriptionValue,
    };

    props.onSubmit(reqData);
  };

  const resetForm = () => {
    setSelectedType("");
    titleReset();
    descriptionReset();
  };

  return (
    <Card className={classes["new-request"]}>
      <h1>New Request</h1>
      <form>
        <div className={classes.control}>
          <label>Type</label>
          <select name="request-type" onChange={typeChangeHandler} required>
            <option value="" disabled selected>
              בחר/י סוג בקשה
            </option>
            <option value="השחרה">בקשת השחרה</option>
            <option value="כניסה רגלי">בקשת אישור כניסה רגלי</option>
            <option value="כניסה רכוב">בקשת אישור כניסה רכוב</option>
            <option value="קידוד">בקשת קידוד חוגר</option>
            <option value="טופס חתימה">בקשת טופס חתימה על שו"ס</option>
          </select>
        </div>
        <InputField
          label="Title"
          name="title"
          value={titleValue}
          hasError={titleHasError}
          onBlur={titleBlurHandler}
          onChange={titleChangeHandler}
          errorMessage="Title is required"
        />
        <InputField
          label="Description"
          name="description"
          value={descriptionValue}
          hasError={descriptionHasError}
          onBlur={descriptionBlurHandler}
          onChange={descriptionChangeHandler}
          errorMessage="Description is required"
        />
        <div className={classes.actions}>
          <Button onClick={submitHandler}>Submit</Button>
        </div>
      </form>
    </Card>
  );
};

const portalElement: HTMLElement = document.getElementById("overlays")!;

const AddRequestOverlay: React.FC<{
  closeOverlay: () => void;
  onSubmit: (reqData: {
    type: string;
    title: string;
    description: string;
  }) => void;
}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.closeOverlay} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <AddRequest closeOverlay={props.closeOverlay} onSubmit={props.onSubmit}/>,
        portalElement,
      )}
    </>
  );
};

export default AddRequestOverlay;
