import React from "react";
import { useToken } from "./auth.js";
import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Boards() {
    const { token } = useToken();
    const [boards, setBoards] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchBoards = async () => {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards`;
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
                setBoards(data);
            }
        }

        fetchBoards();
    }, []);

    if (!token) {
        return <div>Please Log In</div>;
    }

    return (
        <Box sx={{ width: '70%', mx: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
        {boards.map(board => (
            <Card key={board.id} sx={{ width: 150, minWidth: 200 }} variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                        {board.id}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                        {board.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate(`/boards/${board.id}/view`)}>View</Button>
                </CardActions>
            </Card>
            ))}
        </Box>
    );
}
