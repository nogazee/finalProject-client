import { useEffect, useState } from "react";
import RequestsTable from "../requests/RequestsTable";
import DateRange from "../../UI/DateRange";

const RequestsHistory = () => {
  const baseFilters = "&status=APPROVED&status=REJECTED";

  const [filters, setFilters] = useState(baseFilters);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    setFilters(
      baseFilters +
        `${startDate && endDate ? "&start_date=" + startDate.toLocaleString("en-US") + "&end_date=" + endDate.toLocaleString("en-US") : ""}`,
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
      <RequestsTable manage={true} resultsPerPage={50} filters={filters} />
    </>
  );
};

export default RequestsHistory;
