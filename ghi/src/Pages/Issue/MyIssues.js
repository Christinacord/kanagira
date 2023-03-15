import React from "react";
import { useToken } from "../../auth.js";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function MyIssues() {
    const { token } = useToken();
    const [issues, setIssues] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchIssues = async () => {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/issues/me`;
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
                setIssues(data);
                navigate(`/issues`);
            }
        }
/* eslint-disable */
        fetchIssues();
    }, [token]);
/* eslint-enable */
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
            {issues.length === 0 ? (
                <>
                    <Box sx={{ paddingTop: 8, paddingBottom: 8 }}>
                        <Box sx={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ width: '40%', minWidth: 200, backgroundColor: '#272D35', color: 'white', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)' }} variant="outlined">
                                <CardContent>
                                    <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 1.5 }}>
                                        You do not have any issues assigned to you.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box sx={{ paddingTop: 8, paddingBottom: 8 }}>
                    <Box sx={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ width: '70%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                            {issues.map(issue => (
                                <Card key={issue.id} sx={{ width: 150, minWidth: 200, backgroundColor: '#272D35', color: 'white', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)' }} variant="outlined">
                                    <CardContent>
                                        <Typography sx={{ fontSize: 15, color: 'rgba(255, 255, 255, 0.5)' }} gutterBottom>
                                            {issue.id}
                                        </Typography>
                                        <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 1.5 }}>
                                            {issue.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => navigate(`/boards/`)} sx={{ color: 'white', backgroundColor: '#44484F', '&:hover': { backgroundColor: '#383D45' } }}>View</Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 8, marginTop: 4 }}></Box>
                </Box>
            )
            }
        </>
    );
}
