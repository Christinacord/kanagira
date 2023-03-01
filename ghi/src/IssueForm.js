import React from "react";
import { Link } from "react-router-dom";
import { useToken } from "./auth.js";
import { useNavigate, useParams } from "react-router-dom";

export default function IssueForm() {
    const navigate = useNavigate();
    const { board_id, swimlane_id } = useParams();
    const [taskname, setTaskName] = React.useState("");
    const [issue_type, setIssue_Type] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [assignee, setAssignee] = React.useState("");
    // const [creator, setCreator] = React.useState("");

    const { token } = useToken();
    if (!token) {
        return <div>Please Log In</div>;
    }

    const handleTaskNameChange = (e) => {
        const value = e.target.value;
        setTaskName(value);
    };
    const handleIssue_TypeChange = (e) => {
        const value = e.target.value;
        setIssue_Type(value);
    };
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
    };
    const handleAssigneeChange = (e) => {
        const value = e.target.value;
        setAssignee(value);
    };
    // const handleCreator = (e) => {
    //     const value = e.target.value;
    //     setCreator(value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.taskname = taskname;
        data.issue_type = issue_type;
        data.description = description;
        data.assignee = assignee;
        // data.creator = creator;

        const issuesUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swimlane/${swimlane_id}/issues`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(issuesUrl, fetchConfig);
        if (response.ok) {
            const entry = await response.json();
            navigate("/issues");
        }
    };

    return (
        <>
            <div className="issue-page">
                <div className="issue-form">
                    <form onSubmit={handleSubmit} id="issue-form">
                        <div className="row">
                            <div className="form">
                                <input
                                    onChange={handleTaskNameChange}
                                    required
                                    placeholder="task_name"
                                    type="text"
                                    id="task_name"
                                    name="task_name"
                                    className="form"
                                />
                                <label htmlFor="task_name">Task Name</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="issue-page">
                <div className="issue-form">
                    <div className="row">
                        <div className="form">
                            <input
                                onChange={handleIssue_TypeChange}
                                required
                                placeholder="issue_type"
                                type="text"
                                id="issue_type"
                                name="issue_type"
                                className="form"
                            />
                            <label htmlFor="issue_type">Issue Type</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="issue-page">
                <div className="issue-form">
                    <div className="row">
                        <div className="form">
                            <input
                                onChange={handleDescriptionChange}
                                required
                                placeholder="description"
                                type="text"
                                id="description"
                                name="description"
                                className="form"
                            />
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="issue-page">
                <div className="issue-form">
                    <div className="row">
                        <div className="form">
                            <input
                                onChange={handleAssigneeChange}
                                required
                                placeholder="assignee"
                                type="text"
                                id="assignee"
                                name="assignee"
                                className="form"
                            />
                            <label htmlFor="assignee">Assignee</label>
                        </div>
                    </div>
                    <button variant="outlined" size="large">
                        Create Issue
                    </button>
                </div>
            </div>
        </>
    );
}
