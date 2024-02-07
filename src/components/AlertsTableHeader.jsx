export default function AlertsTableHeader(props) {
    return (
        <div className="tableHeader">
            {[
                { name: "Sensor", key: "sensor", style: "flex5 semibold" },
                { name: "Muted", key: "muted", style: "flex1" },
                { name: "Status", key: "status", style: "flex2" },
                { name: "Modified", key: "modified", style: "flex5" },
            ].map((item, index) => (
                <div className={item.style} key={index}>
                    <span
                        onClick={() => props.sort(item.key)}
                        className="sortBy"
                    >
                        {item.name + " "}
                        {props.sortBy.key === item.key
                            ? props.sortBy.asc
                                ? "⬆️"
                                : "⬇️"
                            : ""}
                    </span>
                </div>
            ))}
        </div>
    );
}
