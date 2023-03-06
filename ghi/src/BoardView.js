import React, { useEffect, useState } from "react";
import { useToken } from "./auth.js";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';


export default function BoardView() {
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [inTesting, setInTesting] = useState([]);
  const [done, setDone] = useState([]);
  const [startSwimlaneId, setStartSwimlaneId] = useState(null);
  const [isBacklogHovered, setIsBacklogHovered] = useState(false);
  const [isInProgressHovered, setIsInProgressHovered] = useState(false);
  const [isInReviewHovered, setIsInReviewHovered] = useState(false);
  const [isInTestingHovered, setIsInTestingHovered] = useState(false);
  const [isDoneHovered, setIsDoneHovered] = useState(false);
  const { board_id } = useParams();
  const { token } = useToken();

  useEffect(() => {
    const fetchIssues = async () => {
      const swimlaneStartId = ((board_id - 1) * 5) + 1;
      let count = 1;
      for (let i = swimlaneStartId; i < swimlaneStartId + 5; i++) {
        const swim_lane_id = i;
        setStartSwimlaneId(swim_lane_id);
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
    fetchIssues();
  }, [board_id, token]);

  if (!token) {
    return <div>Please Log In</div>;
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



  return (
    <>
      <Box sx={{ width: '70%', mx: 'auto', display: 'flex', justifyContent: 'center', gap: 2, pt: 2, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: 250, minHeight: '93vh', borderRadius: '0 0 2px 2px' }}
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
              <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
            </Flex>
          ) : (
            <>
              {backlog.map((issue) => (
                <Box key={issue.id} m={1} sx={{ width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
              <Flex style={{ display: 'flex', justifyContent: 'center', visibility: isBacklogHovered ? 'visible' : 'hidden' }}>
                <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
              </Flex>
            </>
          )}
        </Box>
        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: 250, minHeight: '93vh', borderRadius: '0 0 2px 2px' }}
          onMouseEnter={() => setIsInProgressHovered(true)}
          onMouseLeave={() => setIsInProgressHovered(false)}
        >
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
              <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
            </Flex>
          ) : (
            <>
              {inProgress.map((issue) => (
                <Box key={issue.id} m={1} sx={{ width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
              <Flex style={{ display: 'flex', justifyContent: 'center', visibility: isInProgressHovered ? 'visible' : 'hidden' }}>
                <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
              </Flex>
            </>
          )}
        </Box>

        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: 250, minHeight: '93vh', borderRadius: '0 0 2px 2px' }}
          onMouseEnter={() => setIsInReviewHovered(true)}
          onMouseLeave={() => setIsInReviewHovered(false)}
        >
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
              <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
            </Flex>
          ) : (
            <>
              {inReview.map((issue) => (
                <Box key={issue.id} m={1} sx={{ width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
              <Flex style={{ display: 'flex', justifyContent: 'center', visibility: isInReviewHovered ? 'visible' : 'hidden' }}>
                <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
              </Flex>
            </>
          )}
        </Box>
        <Box sx={{ position: 'relative', p: 1, backgroundColor: '#f8f8f8', minWidth: 250, minHeight: '93vh', borderRadius: '0 0 2px 2px' }}
          onMouseEnter={() => setIsInTestingHovered(true)}
          onMouseLeave={() => setIsInTestingHovered(false)}
        >
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
              <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
            </Flex>
          ) : (
            <>
              {inTesting.map((issue) => (
                <Box key={issue.id} m={1} sx={{ width: '95%' }}>
                  <Card sx={{ width: '100%', height: '90px', display: 'flex', flexDirection: 'column', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} variant="outlined">
                    <CardContent sx={{ px: 1, py: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: 1 }}>
                      <Typography sx={{ fontSize: 20, fontWeight: 'bold', pt: 1, pl: 0.5 }} color="text.secondary" gutterBottom>
                        {issue.name}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ ml: 'auto' }}>
                      <Button sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }} size="small">View</Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
              <Flex style={{ display: 'flex', justifyContent: 'center', visibility: isInTestingHovered ? 'visible' : 'hidden' }}>
                <CreateButton sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'text.primary' }} variant="contained" color="primary">➕ Create issue</CreateButton>
              </Flex>
            </>
          )}
        </Box>
        <Box
          sx={{
            position: 'relative',
            p: 1,
            backgroundColor: '#f8f8f8',
            minWidth: 250,
            minHeight: '93vh',
            borderRadius: '0 0 2px 2px',
          }}
          onMouseEnter={() => setIsDoneHovered(true)}
          onMouseLeave={() => setIsDoneHovered(false)}
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
              <CreateButton
                sx={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'text.primary',
                }}
                variant="contained"
                color="primary"
              >
                ➕ Create issue
              </CreateButton>
            </Flex>
          ) : (
            <>
              {done.map((issue) => (
                <Box key={issue.id} m={1} sx={{ width: '95%' }}>
                  <Card
                    sx={{
                      width: '100%',
                      height: '90px',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    variant="outlined"
                  >
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
                      <Button
                        sx={{ color: 'text.secondary', fontSize: 12, pl: 3 }}
                        size="small"
                      >
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
              <Flex
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  visibility: isDoneHovered ? 'visible' : 'hidden',
                }}
              >
                <CreateButton
                  sx={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'text.primary',
                  }}
                  variant="contained"
                  color="primary"
                >
                  ➕ Create issue
                </CreateButton>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
