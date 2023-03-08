import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useToken } from "./auth.js";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function IssueForm(props) {
    const navigate = useNavigate();
    // const { board_id, swimlane_id } = useParams();
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("");
    const { board_id, swim_lane_id, addIssueToBacklog, handleCreateClose } = props;

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
        console.log(data);
        const issuesUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lanes/${swim_lane_id}/issues`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(issuesUrl, fetchConfig);
        if (response.ok) {
            const entry = await response.json();
            addIssueToBacklog(entry);
            handleCreateClose();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ fontWeight: "bold", mb: 2 }}
                    >
                        Create Issue
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    value={name}
                                    onChange={handleNameChange}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="priority"
                                    label="Priority"
                                    name="priority"
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={priority}
                                    onChange={handlePriorityChange}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="type"
                                    label="Type"
                                    name="type"
                                    value={type}
                                    onChange={handleTypeChange}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="difficulty"
                                    label="Difficulty"
                                    name="difficulty"
                                    type="number"
                                    value={difficulty}
                                    onChange={handleDifficultyChange}
                                    autoComplete="off"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                color: "#fff",
                                backgroundColor: "#272D35",
                                "&:hover": {
                                    backgroundColor: "#BDBDBD",
                                    color: "#272D35",
                                },
                            }}
                        >
                            Create Issue
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
