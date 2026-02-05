import { useState, useEffect, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import RequestsTable from "../requests/RequestsTable";
import classes from "./PendingRequests.module.css";

const PendingRequests = () => {
  const [requestType, setRequsetType] = useState("");
  const [params, setParams] = useSearchParams();

  const typeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setRequsetType(event.target.value);
  };

  useEffect(() => {
    setParams(
      (prevParams) => {
        prevParams.set("type", requestType);
        return prevParams;
      },
      { replace: true },
    );
  }, [requestType]);

  return (
    <>
      <div className={classes.control}>
        <select name="request-type" onChange={typeChangeHandler} required>
          <option value="disabled" disabled selected>
            סינון לפי סוג בקשה
          </option>
          <option value="">הכל</option>
          <option value="השחרה">בקשת השחרה</option>
          <option value="כניסה רגלי">בקשת אישור כניסה רגלי</option>
          <option value="כניסה רכוב">בקשת אישור כניסה רכוב</option>
          <option value="קידוד">בקשת קידוד חוגר</option>
          <option value="טופס חתימה">בקשת טופס חתימה על שו"ס</option>
        </select>
      </div>
      <RequestsTable
        manage={true}
        resultsPerPage={50}
        filters={"&" + params.toString() + "&status=PENDING"}
      />
    </>
  );
};

export default PendingRequests;
