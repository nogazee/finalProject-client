import AuthContext from "../../../store/auth-context";
import { useContext, useState } from "react";
import { changeReqStatus } from "../../../lib/api";
import Button from "../../UI/Button";
import classes from "./StatusActions.module.css";
import RejectRequestOverlay from "./RejectRequest";

const StatusActions: React.FC<{ reqId: string }> = (props) => {
  const authCtx = useContext(AuthContext);

  const [rejectReqDisplay, setRejectReqDisplay] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeDisplayHandler = () => {
    setRejectReqDisplay((prevState: boolean) => !prevState);
  };

  const approveClickHandler = async () => {
    const { data, error } = await changeReqStatus(authCtx.token, props.reqId, {
      status: "APPROVED",
    });

    if (data) {
      authCtx.setRefetch();
    }

    setError(error);
  };

  const rejectClickHandler = async () => {
    changeDisplayHandler();
  };

  const submitHandler = async (rejectionComment: string) => {
    const { data, error } = await changeReqStatus(authCtx.token, props.reqId, {
      status: "REJECTED",
      comment: rejectionComment,
    });

    if (data) {
      changeDisplayHandler();
      authCtx.setRefetch();
    }

    setError(error);
  };

  return (
    <>
      {rejectReqDisplay && (
        <RejectRequestOverlay
          onSubmit={submitHandler}
          closeOverlay={changeDisplayHandler}
          error={error}
        />
      )}
      <div className={classes.actions}>
        <Button
          className={classes["approve-btn"]}
          onClick={approveClickHandler}
        >
          Approve
        </Button>
        <Button className={classes["reject-btn"]} onClick={rejectClickHandler}>
          Reject
        </Button>
      </div>
    </>
  );
};

export default StatusActions;
