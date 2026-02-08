import { useState, useContext } from "react";
import AddRequestOverlay from "./AddRequest";
import RequestsTable from "./RequestsTable";
import { createNewRequest } from "../../../lib/api";
import AuthContext from "../../../store/auth-context";

const Requests = () => {
  const authCtx = useContext(AuthContext);

  const [addReqDisplay, setAddReqDisplay] = useState(false);
  const [error, setError] = useState(false);

  const changeDisplayHandler = () => {
    setAddReqDisplay((prevState: boolean) => !prevState);
  };

  const submitHandler = async (reqData: {
    type: string;
    title: string;
    description: string;
  }) => {
    const { data, error } = await createNewRequest(authCtx.token, reqData);

    if (data) {
      changeDisplayHandler();
      authCtx.setRefetch();
    }

    setError(error);
  };

  return (
    <>
      {error && <p>{error}</p>}
      {addReqDisplay && (
        <AddRequestOverlay
          onSubmit={submitHandler}
          closeOverlay={changeDisplayHandler}
        />
      )}
      <RequestsTable
        manage={false}
        resultsPerPage={5}
        filters=""
        onNewReq={changeDisplayHandler}
      />
    </>
  );
};

export default Requests;
