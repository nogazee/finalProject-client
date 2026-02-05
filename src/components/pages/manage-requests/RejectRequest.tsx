import ReactDOM from "react-dom";
import Card from "../../UI/Card";
import InputField from "../../auth/InputField";
import useInput from "../../../hooks/use-input";
import classes from "./RejectRequests.module.css";
import Button from "../../UI/Button";

const valueValidator = (value: string) => {
  return value.trim() !== "";
};

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const RejectRequest: React.FC<{
  onSubmit: (rejectionComment: string) => void;
  error: string | null;
}> = (props) => {
  const {
    value: rejectionCommentValue,
    isValid: rejectionCommentIsValid,
    hasError: rejectionCommentHasError,
    valueChangeHandler: rejectionCommentChangeHandler,
    inputBlurHandler: rejectionCommentBlurHandler,
    reset: rejectionCommentReset,
  } = useInput(valueValidator);

  const formIsValid = rejectionCommentIsValid;

  const submitHandler = async () => {
    if (!formIsValid) {
      return;
    }

    props.onSubmit(rejectionCommentValue);
  };

  return (
    <Card className={classes["reject-request"]}>
      <h1>Reject Request</h1>
      <form>
        <InputField
          label="Rejection Comment"
          name="rejectionComment"
          value={rejectionCommentValue}
          hasError={rejectionCommentHasError}
          onBlur={rejectionCommentBlurHandler}
          onChange={rejectionCommentChangeHandler}
          errorMessage="Rejection comment is required"
        />
        <div className={classes.actions}>
          {props.error && <p>{props.error}</p>}
          <Button onClick={submitHandler}>Submit</Button>
        </div>
      </form>
    </Card>
  );
};

const portalElement: HTMLElement = document.getElementById("overlays")!;

const RejectRequestOverlay: React.FC<{
  onSubmit: (rejectionComment: string) => void;
  closeOverlay: () => void;
  error: string | null;
}> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.closeOverlay} />,
        portalElement,
      )}
      {ReactDOM.createPortal(
        <RejectRequest onSubmit={props.onSubmit} error={props.error} />,
        portalElement,
      )}
    </>
  );
};

export default RejectRequestOverlay;
