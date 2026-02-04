import { useState, useEffect, type ChangeEvent } from "react";
import RequestsTable from "../requests/RequestsTable";
import classes from "./PendingRequests.module.css";

const PendingRequests = () => {
  const baseFilters = "&status=PENDING";
  const [filters, setFilters] = useState(baseFilters);
  const [requestType, setRequsetType] = useState("");

  const typeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setRequsetType(event.target.value);
  };

  useEffect(() => {
    setFilters(
      baseFilters + `${requestType === "" ? "" : "&type=" + requestType}`,
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
      <RequestsTable manage={true} resultsPerPage={50} filters={filters} />
    </>
  );
};

export default PendingRequests;
