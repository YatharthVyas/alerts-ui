import { useState } from "react";
import optionsIcon from "../assets/optionsIcon.png";
import searchIcon from "../assets/searchIcon.png";
import AlertsTable from "../components/AlertsTable";
import CreateAlertModal from "../components/CreateAlertModal";

export default function AlertsPage() {
    const curDate = Date.now();
    const [initData, setInitData] = useState([
        {
            sensor: "Sensor Alpha",
            description: "Sensor 1 Description - some text",
            muted: false,
            status: "Active",
            fired_count: 0,
            modified: curDate - 1000 * 12 * 60,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Beta",
            description: "Sensor 2 Description - lorem ipsum",
            muted: true,
            status: "Fired!",
            fired_count: 130,
            modified: curDate - 1000 * 30 * 60,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Charlie",
            description: "Sensor 3 Description - name of the wind",
            muted: false,
            status: "Active",
            fired_count: 0,
            modified: curDate - 1000 * 40 * 30 * 24,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Delta",
            description: "Sensor 4 Description",
            muted: false,
            status: "Active",
            fired_count: 0,
            modified: curDate - 1000 * 50 * 60 * 24 * 7,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Epsilon",
            description: "Sensor 5 Description",
            muted: true,
            status: "Fired!",
            fired_count: 150,
            modified: curDate - 1000 * 60 * 40 * 24 * 6,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Foxtrot",
            description: "Sensor 6 Description",
            muted: false,
            status: "Active",
            fired_count: 0,
            modified: curDate - 1000 * 60 * 35 * 24 * 5,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Gamma",
            description: "Sensor 7 Description",
            muted: false,
            status: "Active",
            fired_count: 0,
            modified: curDate - 1000 * 60 * 10 * 24 * 4,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Heta",
            description: "Sensor 8 Description",
            muted: true,
            status: "Fired!",
            fired_count: 456,
            modified: curDate - 1000 * 60 * 18 * 24 * 3,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Iota",
            description: "Sensor 9 Description",
            muted: false,
            status: "Fired!",
            fired_count: 70,
            modified: curDate - 1000 * 60 * 60 * 24 * 1,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Jota",
            description: "Sensor 10 Description",
            muted: false,
            status: "Active",
            fired_count: 0,
            modified: curDate - 1000 * 60 * 60 * 12 * 7,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Kappa",
            description: "Sensor 11 Description",
            muted: true,
            status: "Fired!",
            fired_count: 25,
            modified: curDate - 1000 * 60 * 60 * 24 * 6,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Lambda",
            description: "Sensor 12 Description",
            muted: false,
            status: "Fired!",
            fired_count: 20,
            modified: curDate - 1000 * 60 * 60 * 24 * 5,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Moon",
            description: "Sensor 13 Description",
            muted: false,
            status: "Fired!",
            fired_count: 210,
            modified: curDate - 1000 * 60 * 60 * 24 * 5,
            condition: "service[metric] > 100",
        },
        {
            sensor: "Sensor Nail",
            description: "Sensor 14 Description",
            muted: false,
            status: "Fired!",
            fired_count: 20,
            modified: curDate - 1000 * 60 * 60 * 24 * 5,
            condition: "service[metric] > 100",
        },
    ]);
    const [timeFilter, setTimeFilter] = useState("All Time");
    const [data, setData] = useState(initData);
    const [sortBy, setSortBy] = useState({ key: "sensor", asc: true });
    const [modalOpen, setModalOpen] = useState(false);
    const timeInMs = {
        "All Time": Date.now(),
        "15 Min Ago": 1000 * 60 * 15,
        "1 Hour Ago": 1000 * 60 * 60,
        "1 Day Ago": 1000 * 60 * 60 * 24,
        "1 Week Ago": 1000 * 60 * 60 * 24 * 7,
        "1 Month Ago": 1000 * 60 * 60 * 24 * 30,
    };

    const filterByTime = (time) => {
        const filteredData = initData.filter((item) => {
            return Date.now() - timeInMs[time] < item.modified;
        });
        setSortBy({ key: "sensor", asc: true });
        setData(filteredData);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const addAlert = (alert) => {
        const alertEntry = {
            sensor: alert.sensor,
            description: alert.description,
            muted: false,
            status: "Active",
            fired_count: 0,
            modified: Date.now(),
            condition: `${alert.service}[${alert.metric}] ${alert.operator} ${alert.threshold}`,
        };
        setInitData([...initData, alertEntry]);
        setData([...data, alertEntry]);
    };

    const handleSearch = (key) => {
        const filteredData = initData.filter((item) => {
            return (
                item.sensor.toLowerCase().includes(key.toLowerCase()) ||
                item.description.toLowerCase().includes(key.toLowerCase())
            );
        });
        setSortBy({ key: "sensor", asc: true });
        setData(filteredData);
    };

    const sort = (key) => {
        if (sortBy.key === key) {
            const sortedData = data.reverse();
            setData(sortedData);
            setSortBy({ key, asc: !sortBy.asc });
            return;
        }
        setSortBy({ key, asc: true });
        const sortedData = data.sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        });
        setData(sortedData);
    };

    return (
        <div className="container">
            {modalOpen && (
                <CreateAlertModal closeModal={closeModal} addAlert={addAlert} />
            )}
            {/* Header */}
            <div className="flexRow">
                <span className="header">Alerts</span>

                {/* Dropdown */}
                <div className="flexGrow">
                    <div className="dropdown">
                        <span>
                            {timeFilter + " "} {/* Chevron down */}
                            🔽
                        </span>
                        <div className="dropdownContent">
                            {[
                                "All Time",
                                "15 Min Ago",
                                "1 Hour Ago",
                                "1 Day Ago",
                                "1 Week Ago",
                                "1 Month Ago",
                                "Custom...",
                            ].map((option, index) => (
                                <div
                                    key={index}
                                    value={index}
                                    className="dropdownItem"
                                    onClick={() => {
                                        setTimeFilter(option);
                                        filterByTime(option);
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Options Icon */}
                <img src={optionsIcon} height="25" alt="Options" />

                {/* Search input */}
                <div className="flexRow">
                    <input
                        type="text"
                        placeholder="Search Alerts"
                        className="searchInput"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <span className="searchIconContainer">
                        <img
                            src={searchIcon}
                            className="searchIcon"
                            alt="Search"
                        />
                    </span>
                </div>

                {/* Create Button */}
                <button
                    className="createButton"
                    onClick={() => setModalOpen(true)}
                >
                    <span className="addIcon">+</span>
                    <span className="chevronDown">
                        {/* Chevron - Down */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="chevronDownIcon"
                        >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                        </svg>
                    </span>
                </button>
            </div>

            {/* Alerts Table */}
            <AlertsTable data={data} sortBy={sortBy} sort={sort} />
        </div>
    );
}
