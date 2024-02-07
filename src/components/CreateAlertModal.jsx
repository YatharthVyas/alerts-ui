import { useState } from "react";

export default function CreateAlertModal(props) {
    const [alert, setAlert] = useState({
        sensor: "",
        description: "",
        service: "",
        metric: "",
        operator: "",
        threshold: "",
        expiry: "",
        runs: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Can add validation here

        props.addAlert(alert);
        props.closeModal();
    };

    const handleInputChange = (e) => {
        setAlert({ ...alert, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <div className="container">
                    <h2 align="center">Create New Alert Sensor</h2>
                    <form>
                        <div>
                            <input
                                type="text"
                                id="name"
                                name="sensor"
                                placeholder="Name"
                                className="modalInput fullWidth"
                                onChange={handleInputChange}
                                value={alert.sensor}
                            />
                        </div>
                        <div>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Description (optional)"
                                rows="4"
                                className="modalInput fullWidth"
                                onChange={handleInputChange}
                                value={alert.description}
                            ></textarea>
                        </div>
                        <h3>Trigger Condition</h3>
                        <div>
                            <select
                                id="service"
                                name="service"
                                className="modalInput mw150"
                                onChange={handleInputChange}
                                value={alert.service}
                            >
                                <option value="api-server">API Server</option>
                                <option value="ui-deployment">
                                    UI Deployment
                                </option>
                                {/* Can add more options */}
                            </select>
                            <select
                                id="metric"
                                name="metric"
                                className="modalInput mw150"
                                onChange={handleInputChange}
                                value={alert.metric}
                            >
                                <option value="latency">Latency</option>
                                <option value="loss">Loss</option>
                                {/* Can add more options */}
                            </select>
                        </div>
                        <div>
                            <select
                                id="operator"
                                name="operator"
                                className="modalInput mw150"
                                onChange={handleInputChange}
                                value={alert.operator}
                            >
                                <option value=">">{">"}</option>
                                <option value="<">{"<"}</option>
                                <option value=">=">{">="}</option>
                                <option value="<=">{"<="}</option>
                                <option value="==">{"=="}</option>
                            </select>
                            <input
                                type="number"
                                id="threshold"
                                name="threshold"
                                placeholder="Threshold"
                                className="modalInput"
                                onChange={handleInputChange}
                                value={alert.threshold}
                            />
                        </div>
                        <h3>Settings</h3>
                        <div className="formContent">
                            <span className="mw150">Alert Expires After: </span>
                            <input
                                id="expires_after_number"
                                name="expiry"
                                type="number"
                                className="modalInput"
                                onChange={handleInputChange}
                                value={alert.expiry}
                            />
                            <select
                                id="expires_after_unit"
                                name="expires_after_unit"
                                className="modalInput mw150"
                                value="minutes"
                            >
                                <option value="minutes">Minutes</option>
                            </select>
                        </div>
                        <div className="formContent">
                            <span className="mw150">Alert runs every: </span>
                            <input
                                id="runs_every_number"
                                name="runs"
                                type="number"
                                className="modalInput"
                                onChange={handleInputChange}
                                value={alert.runs}
                            />
                            <select
                                id="runs_every_unit"
                                name="runs_every_unit"
                                className="modalInput mw150"
                            >
                                <option value="minutes">Minutes</option>
                            </select>
                        </div>
                        <div align="center">
                            <button
                                type="button"
                                className="cancelBtn"
                                onClick={() => props.closeModal()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submitBtn"
                                onClick={handleSubmit}
                            >
                                Create Sensor
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
