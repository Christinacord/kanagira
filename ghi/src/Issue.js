import React, { useEffect, useState } from "react";
import { useToken } from "./auth.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Select, MenuItem } from "@mui/material";
import { isUnitless } from "@mui/material/styles/cssUtils.js";
import { IconButton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';


export default function Issue(props) {

    const [issue, setIssue] = useState(null);
    const [users, setUsers] = useState([]);
    const [assignee, setAssignee] = useState(null);
    const { board_id, swim_lane_id, issue_id } = props;
    const { token } = useToken();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchIssue = async () => {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lanes/${swim_lane_id}/issues/${issue_id}`;
            const fetchConfig = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setIssue(data);
                setAssignee(data.assignee_id);
            }
        };

        const fetchUsers = async () => {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts`;
            const fetchConfig = {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        };

        fetchIssue();
        fetchUsers();
    }, [issue_id, token]);

    const handleAssigneeChange = async (event) => {
        const newAssigneeId = event.target.value;
        setAssignee(newAssigneeId);
        const updatedIssue = {
            ...issue,
            assignee_id: newAssigneeId,
        };
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lanes/${swim_lane_id}/issues/${issue_id}`;
        const fetchConfig = {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedIssue),
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            setIssue({
                ...issue,
                assignee_id: newAssigneeId,
            });
        }
    }

    const handleSwimlaneIncrease = async (currSwimlane) => {
        const maxId = swim_lane_id + 4;
        if (currSwimlane < maxId) {
            const newSwimLaneId = currSwimlane + 1;
            console.log(newSwimLaneId);
            const updatedIssue = {
                ...issue,
                swim_lane_id: newSwimLaneId,
            }
            console.log(updatedIssue);
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lanes/${swim_lane_id}/issues/${issue_id}`;
            const fetchConfig = {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedIssue),
            };
            const response = await fetch(url, fetchConfig);
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setIssue({
                    ...issue,
                    swim_lane_id: newSwimLaneId,
                });
            }
        }
    }

    const handleSwimlaneDecrease = async (currSwimlane) => {
        const minId = swim_lane_id;
        if (currSwimlane > minId) {
            const newSwimLaneId = currSwimlane - 1;
            console.log(newSwimLaneId);
            const updatedIssue = {
                ...issue,
                swim_lane_id: newSwimLaneId,
            }
            console.log(updatedIssue);
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lanes/${swim_lane_id}/issues/${issue_id}`;
            const fetchConfig = {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedIssue),
            };
            const response = await fetch(url, fetchConfig);
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setIssue({
                    ...issue,
                    swim_lane_id: newSwimLaneId,
                });
            }
        }
    };

    return (
        <>
            <Box
                sx={{ "& .MuiDialog-paper": { height: "30%", width: "30%", maxWidth: "none" } }}
            >
                {issue && (
                    <>
                        <Box
                            sx={{ textAlign: "left", fontWeight: "bold", fontSize: "2rem", marginBottom: "1rem" }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    {issue.difficulty && (
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                borderRadius: "4px",
                                                backgroundColor: (() => {
                                                    switch (issue.difficulty) {
                                                        case 1:
                                                            return "green";
                                                        case 2:
                                                            return "blue";
                                                        case 3:
                                                            return "yellow";
                                                        case 4:
                                                            return "orange";
                                                        case 5:
                                                            return "red";
                                                        default:
                                                            return "gray";
                                                    }
                                                })(),
                                                mr: 2,
                                            }}
                                        />
                                    )}
                                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                                        {issue.name}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ mr: 2 }}>
                                        Priority: {issue.priority}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom sx={{ mr: 2 }}>
                                        Type: {issue.type}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    mb: 2,
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    variant="outlined"
                                    sx={{ flexGrow: 1, p: 2, height: "100%" }}
                                >
                                    <Box
                                        sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            gutterBottom
                                            sx={{ color: "grey", mb: 1 }}
                                        >
                                            Description:
                                        </Typography>
                                        <Typography variant="body1">{issue.description}</Typography>
                                    </Box>
                                </Paper>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                            <Box>
                                {issue.assignee_name && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            flexGrow: 1,
                                            pl: 1.5,
                                            borderLeft: "4px solid #272D35",
                                        }}
                                    >
                                        <Box sx={{ mr: 2 }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Assignee:
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Select
                                                labelId="assignee-select-label"
                                                id="assignee-select"
                                                value={assignee}
                                                onChange={handleAssigneeChange}
                                                sx={{ minWidth: "180px", height: "32px" }}
                                            >
                                                {users.map((user) => (
                                                    <MenuItem key={user.id} value={user.id}>
                                                        {user.full_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Box>
                                <IconButton
                                    aria-label="move-left"
                                    onClick={() => handleSwimlaneDecrease(issue.swim_lane_id)}
                                    sx={{ mr: 2 }}
                                >
                                    <ChevronLeft />
                                </IconButton>
                                <IconButton
                                    aria-label="move-right"
                                    onClick={() => handleSwimlaneIncrease(issue.swim_lane_id)}
                                    sx={{ mr: 2 }}
                                >
                                    <ChevronRight />
                                </IconButton>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
}
