import React, { useEffect, useState } from "react";
import { useToken } from "../../auth.js";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Select, MenuItem } from "@mui/material";
import { IconButton } from '@mui/material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


export default function Issue(props) {

    const [issue, setIssue] = useState(null);
    const [users, setUsers] = useState([]);
    const [assignee, setAssignee] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [description, setDescription] = useState(null);
    const [name, setName] = useState(null);
    const { board_id, swim_lane_id, issue_id, swimlaneRefresh } = props;
    const { token } = useToken();

    const handleNameClick = () => {
        setIsEditingName(true);
    };

    const handleDescriptionClick = () => {
        setIsEditingDescription(true);
    };


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleNameKeyDown = async (e) => {
        if (e.key === "Enter") {
            setIsEditingName(false);
            const updatedIssue = {
                ...issue,
                name: name,
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
                    name: data.name,
                });
                swimlaneRefresh(data);
            }
        }
    };

    const handleDescriptionKeyDown = async (e) => {
        if (e.key === "Enter") {
            setIsEditingDescription(false);
            const updatedIssue = {
                ...issue,
                description: description,
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
                    description: data.description,
                });
                swimlaneRefresh(data);
            }
        }
    };

    const handleDescriptionBlur = async () => {
        setIsEditingDescription(false);
        const updatedIssue = {
            ...issue,
            description: description,
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
                description: data.description,
            });
            swimlaneRefresh(data);
        }
    };


    const handleNameBlur = async () => {
        setIsEditingName(false);
        const updatedIssue = {
            ...issue,
            name: name,
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
                name: data.name,
            });
            swimlaneRefresh(data);
        }
    };

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
                setDescription(data.description);
                setName(data.name);
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
/* eslint-disable */
        fetchIssue();
        fetchUsers();
    }, [issue_id, token]);
/* eslint-enable */

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
            /* eslint-disable */
            const data = await response.json();
            /* eslint-enable */
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
            const updatedIssue = {
                ...issue,
                swim_lane_id: newSwimLaneId,
            }
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
                    swim_lane_id: newSwimLaneId,
                });
                swimlaneRefresh(data);
            }
        }
    }

    const handleSwimlaneDecrease = async (currSwimlane) => {
        const minId = swim_lane_id;
        if (currSwimlane > minId) {
            const newSwimLaneId = currSwimlane - 1;
            const updatedIssue = {
                ...issue,
                swim_lane_id: newSwimLaneId,
            }
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
                    swim_lane_id: newSwimLaneId,
                });
                swimlaneRefresh(data);
            }
        }
    };

    if (!token) {
        return (
            <>
                <Box sx={{ paddingTop: 8, paddingBottom: 8 }}>
                    <Box sx={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Card sx={{ width: '40%', minWidth: 200, backgroundColor: '#272D35', color: 'white', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)' }} variant="outlined">
                            <CardContent sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <Button component={Link} to="/login" variant="body2" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 1.5 }}>
                                        Please log in
                                    </Typography>
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </>
        )
    }


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
                                    {isEditingName ? (
                                        <Input
                                            value={name}
                                            onChange={handleNameChange}
                                            onKeyDown={handleNameKeyDown}
                                            onBlur={handleNameBlur}
                                            autoFocus
                                        />
                                    ) : (
                                        <Typography
                                            sx={{ fontSize: "1.2rem", fontWeight: "bold", cursor: "pointer" }}
                                            onClick={handleNameClick}
                                        >
                                            {issue.name}
                                        </Typography>
                                    )}
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
                                        {isEditingDescription ? (
                                            <TextareaAutosize
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                onKeyDown={handleDescriptionKeyDown}
                                                onBlur={handleDescriptionBlur}
                                                autoFocus
                                            />
                                        ) : (
                                            <Typography variant="body1" onClick={handleDescriptionClick}>
                                                {issue.description}
                                            </Typography>
                                        )}
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
                                                value={assignee || ''}
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
