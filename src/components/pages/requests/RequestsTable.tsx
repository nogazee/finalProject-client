import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../store/auth-context";
import { getRequests } from "../../../lib/api";
import RequestItem from "./RequestItem";
import type IRequest from "../../../types/requestType";
import classes from "./RequestsTable.module.css";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Pagination from "../../layout/Pagination";

interface RequestsTableProps {
  manage: boolean;
  resultsPerPage: number;
  filters: string;
  onNewReq?: () => void;
}

const RequestsTable: React.FC<RequestsTableProps> = (props) => {
  const authCtx = useContext(AuthContext);

  const [requests, setRequests] = useState<IRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const params =
    new URLSearchParams({
      resultsPerPage: props.resultsPerPage.toString(),
      pageNumber: pageNumber.toString(),
    }).toString() + props.filters;

  const pageChangeHandler = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setIsLoading(true);
      setPageNumber(pageNumber);
    }
  };

  useEffect(() => {
    const loadRequests = async () => {
      const { data, error } = await getRequests(
        authCtx.token,
        params,
        props.manage,
      );

      if (data.requests) {
        setRequests(data.requests);
      }

      setError(error);
      setIsLoading(false);
      setTotalPages(Math.ceil(data.documentCount / props.resultsPerPage));
    };

    loadRequests();
  }, [pageNumber, params]);

  return (
    <>
      {!props.manage && (
        <Button className={classes.btn} onClick={props.onNewReq}>
          + Add Request
        </Button>
      )}
      <Card className={`${classes.card} ${props.manage ? classes.wide : ""}`}>
        {props.manage && requests.length > 5 && (
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        )}
        {isLoading ? (
          "Loading..."
        ) : requests.length === 0 ? (
          "No requests"
        ) : (
          <table>
            <thead>
              <tr>
                {props.manage && <th>Requestor</th>}
                <th>Type</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <RequestItem
                  request={request}
                  manage={props.manage}
                  key={index}
                />
              ))}
            </tbody>
          </table>
        )}
        {requests.length > 0 && (
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        )}
      </Card>
    </>
  );
};

export default RequestsTable;
