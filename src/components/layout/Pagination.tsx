import Button from "../UI/Button";
import classes from "./Pagination.module.css";

const Pagination: React.FC<{
  pageNumber: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}> = (props) => {
  return (
    <div className={classes.pagination}>
      <Button
        disabled={props.pageNumber === 1}
        onClick={() => props.onPageChange(props.pageNumber - 1)}
      >
        ←
      </Button>
      <p>
        Page {props.pageNumber} of {props.totalPages}
      </p>
      <Button
        disabled={props.pageNumber === props.totalPages}
        onClick={() => props.onPageChange(props.pageNumber + 1)}
      >
        →
      </Button>
    </div>
  );
};

export default Pagination;
