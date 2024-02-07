import AlertsTableHeader from "./AlertsTableHeader";
import AlertsTableRow from "./AlertsTableRow";

export default function AlertsTable(props) {
    return (
        <div>
            <AlertsTableHeader sortBy={props.sortBy} sort={props.sort} />
            {props.data.map((row, index) => (
                <AlertsTableRow key={index} alert={row} />
            ))}
        </div>
    );
}
