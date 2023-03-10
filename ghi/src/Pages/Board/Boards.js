import React from "react";
import { useToken } from '../../auth.js';
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BoardForm from "./BoardForm.js";
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Boards() {
    const { token } = useToken();
    const [boards, setBoards] = React.useState([]);
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <Box sx={{ paddingTop: 8, paddingBottom: 8 }}>
            <Box sx={{ height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '70%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                    {boards.map(board => (
                        <Card key={board.id} sx={{ width: 150, minWidth: 200, backgroundColor: '#272D35', color: 'white', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)' }} variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 15, color: 'rgba(255, 255, 255, 0.5)' }} gutterBottom>
                                    {board.id}
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', mt: 1.5 }}>
                                    {board.name}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(`/boards/${board.id}/view`)} sx={{ color: 'white', backgroundColor: '#44484F', '&:hover': { backgroundColor: '#383D45' } }}>View</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 8, marginTop: 4 }}>
                <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#272D35', color: 'white', '&:hover': { backgroundColor: '#383D45' }, fontSize: 18, padding: '12px 24px' }}>Create Board</Button>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <BoardForm />
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
}
