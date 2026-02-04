import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRange.css";

const DateRange: React.FC<{
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
}> = (props) => {
  return (
    <DatePicker
      placeholderText="Click to select date range"
      selected={props.startDate}
      onChange={props.onChange}
      startDate={props.startDate}
      endDate={props.endDate}
      dateFormat="dd/MM/yyyy"
      selectsRange
      isClearable
    />
  );
};

export default DateRange;
