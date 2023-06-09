import React, { useEffect, useState } from "react";
import { useToken } from '../../auth.js';
import { useParams, Link } from "react-router-dom";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Issue from "../Issue/IssueView.js";
import Modal from '@mui/material/Modal';
import IssueForm from "../Issue/IssueForm.js";


export default function BoardView() {
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [inTesting, setInTesting] = useState([]);
  const [done, setDone] = useState([]);
  const [startSwimlaneId, setStartSwimlaneId] = useState(null);
  const [isBacklogHovered, setIsBacklogHovered] = useState(false);
  const { board_id } = useParams();
  const { token } = useToken();
  const [open, setOpen] = useState({ open: false, issue_id: "" });
  const handleClose = () => setOpen({ open: false, issue_id: "" });
  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  /* eslint-disable */
  useEffect(() => {
    fetchIssues();
  }, [board_id, token]);
  /* eslint-enable */


  const fetchIssues = async () => {
    const swimlaneStartId = ((board_id - 1) * 5) + 1;
    setStartSwimlaneId(swimlaneStartId);
    let count = 1;
    for (let i = swimlaneStartId; i < swimlaneStartId + 5; i++) {
      const swim_lane_id = i;
      const issuesUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lanes/${swim_lane_id}/issues`;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(issuesUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        if (count === 1) {
          setBacklog(data);
        }
        else if (count === 2) {
          setInProgress(data);
        }
        else if (count === 3) {
          setInReview(data);
        }
        else if (count === 4) {
          setInTesting(data);
        }
        else if (count === 5) {
          setDone(data);
        }
      }
      count += 1;
    }
  };

  function addIssueToBacklog(issue) {
    const newBacklog = [...backlog, issue]
    setBacklog(() => {
      return newBacklog
    })
  }

  function swimlaneRefresh(issue) {
    fetchIssues();
  }

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

  const Flex = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: '15px',
  });

  const CreateButton = styled(Button)({
    backgroundColor: '#f8f8f8',
    color: '#979797',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f8f8f8',
      boxShadow: 'none',
    },
  });

  const viewStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 6,
    boxShadow: 24,
    p: 2,
  };


  return (
    <>
      <Box sx={{ width: '80vw', mx: 'auto', display: 'flex', justifyContent: 'center', gap: 2, pt: 2, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: '17%', minHeight: '93vh', borderRadius: '0 0 2px 2px' }}
          onMouseEnter={() => setIsBacklogHovered(true)}
          onMouseLeave={() => setIsBacklogHovered(false)}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '2rem', fontWeight: 'lighter', color: 'text.primary', pb: 2 }}>
            <Typography variant="h4" component="div">
              Backlog
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 'normal' }}>
              ({backlog.length} issues)
            </Typography>
          </Box>
          {backlog.length === 0 ? (
            <Flex style={{ display: 'flex', justifyContent: 'center' }}>
              <CreateButton onClick={handleCreateOpen} sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
              <Modal
                open={createOpen}
                onClose={handleCreateClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <IssueForm board_id={board_id} swim_lane_id={startSwimlaneId} addIssueToBacklog={addIssueToBacklog} handleCreateClose={handleCreateClose} />
                </Box>
              </Modal>
            </Flex>
          ) : (
            <>
              {backlog.map((issue) => (
                <Box key={issue.id} sx={{ my: 1, mx: 'auto', width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button onClick={() => setOpen({ open: true, issue_id: issue.id })} sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
              <Flex style={{ display: 'flex', justifyContent: 'center', visibility: isBacklogHovered ? 'visible' : 'hidden' }}>
                <CreateButton onClick={handleCreateOpen} sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
                <Modal
                  open={createOpen}
                  onClose={handleCreateClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <IssueForm board_id={board_id} swim_lane_id={startSwimlaneId} addIssueToBacklog={addIssueToBacklog} handleCreateClose={handleCreateClose} />
                  </Box>
                </Modal>
              </Flex>
            </>
          )}
        </Box>
        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: '17%', minHeight: '93vh', borderRadius: '0 0 2px 2px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '2rem', fontWeight: 'lighter', color: 'text.primary', pb: 2 }}>
            <Typography variant="h4" component="div">
              In Progress
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 'normal' }}>
              ({inProgress.length} issues)
            </Typography>
          </Box>
          {inProgress.length === 0 ? (
            <Flex style={{ display: 'flex', justifyContent: 'center' }}>
            </Flex>
          ) : (
            <>
              {inProgress.map((issue) => (
                <Box key={issue.id} sx={{ my: 1, mx: 'auto', width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button onClick={() => setOpen({ open: true, issue_id: issue.id })} sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: '17%', minHeight: '93vh', borderRadius: '0 0 2px 2px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '2rem', fontWeight: 'lighter', color: 'text.primary', pb: 2 }}>
            <Typography variant="h4" component="div">
              In Review
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 'normal' }}>
              ({inReview.length} issues)
            </Typography>
          </Box>
          {inReview.length === 0 ? (
            <Flex style={{ display: 'flex', justifyContent: 'center' }}>
            </Flex>
          ) : (
            <>
              {inReview.map((issue) => (
                <Box key={issue.id} sx={{ my: 1, mx: 'auto', width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button onClick={() => setOpen({ open: true, issue_id: issue.id })} sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: '17%', minHeight: '93vh', borderRadius: '0 0 2px 2px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '2rem', fontWeight: 'lighter', color: 'text.primary', pb: 2 }}>
            <Typography variant="h4" component="div">
              In Testing
            </Typography>
            <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary', fontWeight: 'normal' }}>
              ({inTesting.length} issues)
            </Typography>
          </Box>
          {inTesting.length === 0 ? (
            <Flex style={{ display: 'flex', justifyContent: 'center' }}>
            </Flex>
          ) : (
            <>
              {inTesting.map((issue) => (
                <Box key={issue.id} sx={{ my: 1, mx: 'auto', width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button onClick={() => setOpen({ open: true, issue_id: issue.id })} sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box
          sx={{
            position: 'relative',
            p: 1,
            backgroundColor: '#f8f8f8',
            minWidth: '17%',
            minHeight: '93vh',
            borderRadius: '0 0 2px 2px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: '2rem',
              fontWeight: 'lighter',
              color: 'text.primary',
              pb: 2,
            }}
          >
            <Typography variant="h4" component="div">
              Done
            </Typography>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                fontWeight: 'normal',
              }}
            >
              ({done.length} issues)
            </Typography>
          </Box>
          {done.length === 0 ? (
            <Flex
              style={{
                display: 'flex',
                justifyContent: 'center',
                visibility: 'visible',
              }}
            >
            </Flex>
          ) : (
            <>
              {done.map((issue) => (
                <Box key={issue.id} sx={{ my: 1, mx: 'auto', width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent
                      sx={{
                        px: 1,
                        py: 0,
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        pb: 1,
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button onClick={() => setOpen({ open: true, issue_id: issue.id })} sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
      <Modal
        open={open.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={viewStyle}>
          <Issue board_id={board_id} swim_lane_id={startSwimlaneId} issue_id={open.issue_id} swimlaneRefresh={swimlaneRefresh} />
        </Box>
      </Modal>
    </>
  );
}
