import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RequestsTable from "../requests/RequestsTable";
import DateRange from "../../UI/DateRange";

const RequestsHistory = () => {
  const [params, setParams] = useSearchParams();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setParams(
      (prevParams) => {
        if (startDate && endDate) {
          prevParams.set("start_date", startDate.toLocaleDateString("en-US"));
          prevParams.set("end_date", endDate.toLocaleDateString("en-US"));
        } else if (startDate === null && endDate === null) {
          prevParams.set("start_date", "");
          prevParams.set("end_date", "");
        }
        return prevParams;
      },
      { replace: true },
    );
  }, [startDate, endDate]);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <DateRange startDate={startDate} endDate={endDate} onChange={onChange} />
      <RequestsTable
        manage={true}
        resultsPerPage={50}
        filters={"&" + params.toString() + "&status=APPROVED&status=REJECTED"}
      />
    </>
  );
};

export default RequestsHistory;
