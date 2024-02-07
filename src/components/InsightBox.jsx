import ReactApexChart from "react-apexcharts";
import moment from "moment";

export default function InsightBox(props) {
    const date = moment(props.alert.modified);
    const options = {
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
            dashArray: [0, 8],
        },
        title: {
            text: "Panel Title",
            align: "left",
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: [
                " ",
                "8pm",
                " ",
                "9pm",
                " ",
                "10pm",
                " ",
                "11pm",
                " ",
                "12am",
                " ",
                "1am",
                " ",
                "2am",
                " ",
            ],
        },
    };

    const series = [
        {
            name: "Alerts",
            data: [5, 10, 7, 9, 21, 89, 41, 20, 10, 11, 15, 12, 4, 3, 7],
        },
        {
            name: "Threshold",
            data: Array(15).fill(50),
        },
    ];

    return (
        <div className="insightContainer">
            <div className="flexRow">
                <div className="flex1 borderRight">
                    {/* Graph */}
                    <div
                        id={"chart" + props.alert.sensor}
                        className="sparkline"
                    >
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="line"
                            height={350}
                            width={450}
                        />
                    </div>
                    <div className="title">{props.alert.sensor}</div>
                    <div className="description">{props.alert.description}</div>
                    <div className="flexRow mt10">
                        <div align="right" className="flex1">
                            Status:{" "}
                        </div>
                        <div className="flex4 description" align="left">
                            <span
                                className={
                                    props.alert.status === "Active"
                                        ? "green"
                                        : "red"
                                }
                            >
                                {props.alert.status}
                            </span>
                            {props.alert.fired_count === 0
                                ? ""
                                : `- ${props.alert.fired_count} times`}
                        </div>
                    </div>
                    <div className="flexRow">
                        <div align="right" className="flex1">
                            Condition:{" "}
                        </div>
                        <div className="flex4 description">
                            <span>{props.alert.condition}</span>
                        </div>
                    </div>
                </div>
                <div className="flex1">
                    <h3 className="title" align="center">
                        Recent Activity
                    </h3>
                    <div className="tableHeader">
                        <div className="flex1">Status</div>
                        <div className="flex4">Modified</div>
                    </div>
                    {[1, 2, 3, 4, 5].map((row) => (
                        <div className="tableRow" key={row}>
                            <div className="flex1">Active</div>
                            <div className="flex3">
                                {date.format("MMM D, YYYY - h:mm A")}
                            </div>
                            <div className="flex1" align="right">
                                🔵
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
