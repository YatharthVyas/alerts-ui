import moment from "moment";
import InsightBox from "./InsightBox";

export default function AlertsTableRow(props) {
    const date = moment(props.alert.modified);

    return (
        <div className="alertsRow">
            <div className="tableRow">
                <div className="flex5">
                    <span className="semibold mr16 mw100">
                        {props.alert.sensor}
                    </span>
                    {props.alert.description}
                </div>
                <div className="flex1">{props.alert.muted ? "✅" : "❌"}</div>
                <div className="flex2">
                    <span
                        className={
                            props.alert.status === "Active"
                                ? "semibold green"
                                : "semibold red"
                        }
                    >
                        {props.alert.status}
                    </span>{" "}
                    {props.alert.fired_count === 0
                        ? ""
                        : `- ${props.alert.fired_count} times`}
                </div>
                <div className="flex4">
                    {date.format("MMM D, YYYY - h:mm A")}
                </div>
                <div className="flex1" align="right">
                    🔵
                </div>
            </div>

            <InsightBox alert={props.alert} />
        </div>
    );
}
