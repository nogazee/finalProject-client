import type IRequest from "../../../types/requestType";
import TdExpand from "./TdExpand";
import StatusActions from "../manage-requests/StatusActions";
import classes from "./RequestItem.module.css";

export interface RequestItemProps {
  request: IRequest;
  manage: boolean;
}

const RequestItem = (props: RequestItemProps) => {
  const {
    type,
    status,
    title,
    description,
    createdAt,
    requestor,
    _id,
    rejectionComment,
  } = props.request;
  const date = new Date(createdAt).toDateString();

  return (
    <tr>
      {props.manage && <td>{requestor.name}</td>}
      <td>{type}</td>
      <td>{title}</td>
      <TdExpand text={description}></TdExpand>
      <td>{date}</td>
      <td className={classes.status}>
        <div className={classes[`${status.toLowerCase()}`]}>{status}</div>
      </td>
      {props.manage ? (
        <td>
          {(status === "PENDING" && <StatusActions reqId={_id} />) ||
            (status === "REJECTED" && rejectionComment)}
        </td>
      ) : (
        <td>{status === "REJECTED" && rejectionComment}</td>
      )}
    </tr>
  );
};

export default RequestItem;
