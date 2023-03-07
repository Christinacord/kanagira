import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToken } from "./auth.js";


export default function IssueForm(props) {
    const navigate = useNavigate();
    // const { board_id, swimlane_id } = useParams();
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("");
    const { board_id, swim_lane_id } = props;

    const { token } = useToken();
    if (!token) {
        return <div>Please Log In</div>;
    }

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    };
    const handleTypeChange = (e) => {
        const value = e.target.value;
        setType(value);
    };
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
    };

    const handlePriorityChange = (e) => {
        const value = e.target.value;
        setPriority(value);
    };

    const handleDifficultyChange = (e) => {
        const value = e.target.value;
        setDifficulty(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.name = name;
        data.description = description;
        data.priority = priority;
        data.type = type;
        data.difficulty = difficulty;
        data.assignee = 0;
        const issuesUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lanes/${swim_lane_id}/issues`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(issuesUrl, fetchConfig);
        if (response.ok) {
            const entry = await response.json();

        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} id="issue-form">
                    <div className="issue-page">
                        <div className="issue-form">
                            <div className="row">
                                <div className="form">
                                    <input
                                        onChange={handleNameChange}
                                        required
                                        placeholder="name"
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form"
                                    />
                                    <label htmlFor="name">Issue Name</label>
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
                                        onChange={handlePriorityChange}
                                        required
                                        placeholder="priority"
                                        type="text"
                                        id="priority"
                                        name="priority"
                                        className="form"
                                    />
                                    <label htmlFor="priority">Priority</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="issue-page">
                        <div className="issue-form">
                            <div className="row">
                                <div className="form">
                                    <input
                                        onChange={handleTypeChange}
                                        required
                                        placeholder="issue type"
                                        type="text"
                                        id="type"
                                        name="type"
                                        className="form"
                                    />
                                    <label htmlFor="type">Issue Type</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="issue-page">
                        <div className="issue-form">
                            <div className="row">
                                <div className="form">
                                    <input
                                        onChange={handleDifficultyChange}
                                        required
                                        placeholder="difficulty"
                                        type="text"
                                        id="difficulty"
                                        name="difficulty"
                                        className="form"
                                    />
                                    <label htmlFor="difficulty">Difficulty</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="issue-page">
                        <div className="issue-form">
                            <button variant="outlined" size="large">
                                Create Issue
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
