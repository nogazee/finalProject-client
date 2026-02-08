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

  const [sortOrder, setSortOrder] = useState("asc");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const params =
    new URLSearchParams({
      resultsPerPage: props.resultsPerPage.toString(),
      pageNumber: pageNumber.toString(),
      sortOrder: sortOrder,
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

      if (data) {
        setRequests(data.requests);
        setTotalPages(Math.ceil(data.documentCount / props.resultsPerPage));
      }

      setError(error);

      setIsLoading(false);
    };

    loadRequests();
  }, [pageNumber, params, authCtx.refetch]);

  return (
    <>
      {error ? (
        <Card>{error}</Card>
      ) : (
        <>
          {!props.manage && (
            <Button className={classes.btn} onClick={props.onNewReq}>
              + Add Request
            </Button>
          )}
          <Card
            className={`${classes.card} ${props.manage ? classes.wide : ""}`}
          >
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
              props.manage ? (
                "No results found"
              ) : (
                "There are no requests yet, add a new one."
              )
            ) : (
              <>
                <Button
                  className={classes.sortOrderBtn}
                  onClick={() => {
                    setSortOrder((prevState) =>
                      prevState === "desc" ? "asc" : "desc",
                    );
                  }}
                >
                  ↑↓
                </Button>
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
              </>
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
      )}
    </>
  );
};

export default RequestsTable;
