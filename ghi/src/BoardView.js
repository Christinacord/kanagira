import React, { useEffect, useState } from "react";
import { useToken } from "./auth.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
export default function BoardView() {
  const [backlog, setBacklog] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [inTesting, setInTesting] = useState([]);
  const [done, setDone] = useState([]);
  const { board_id } = useParams();
  const { token } = useToken();
  useEffect(() => {
    const fetchIssues = async () => {
      const swimlaneStartId = ((board_id - 1) * 5) + 1;
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
    fetchIssues();
  }, [board_id, token]);
  console.log(backlog);
  console.log(inProgress)
  console.log(inReview);
  console.log(inTesting)
  console.log(done);
  if (!token) {
    return <div>Please Log In</div>;
  }
  return (
    <>
      <Box sx={{ width: '70%', mx: 'auto', display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Box sx={{ border: '1px solid black', p: 1, backgroundColor: '#f8f8f8', minWidth: 200g }}>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            Backlog
          </Typography>
          {backlog.map(issue => (
            <Box m={1}>
              <Card key={issue.id} sx={{ width: 200 }} variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                    {issue.id}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {issue.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
        <Box sx={{ border: '1px solid black', p: 1, backgroundColor: '#f8f8f8', minWidth: 200 }}>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            In Progress
          </Typography>
          {inProgress.map(issue => (
            <Box m={1}>
              <Card key={issue.id} sx={{ width: 200 }} variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                    {issue.id}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {issue.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
        <Box sx={{ border: '1px solid black', p: 1, backgroundColor: '#f8f8f8' }}>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            In Review
          </Typography>
          {inReview.map(issue => (
            <Box m={1}>
              <Card key={issue.id} sx={{ width: 200 }} variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                    {issue.id}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {issue.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
        <Box sx={{ border: '1px solid black', p: 1, backgroundColor: '#f8f8f8', minWidth: 200 }}>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            In Testing
          </Typography>
          {inTesting.map(issue => (
            <Box m={1}>
              <Card key={issue.id} sx={{ width: 200 }} variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                    {issue.id}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {issue.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
        <Box sx={{ border: '1px solid black', p: 1, backgroundColor: '#f8f8f8', minWidth: 200}}>
          <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
            Done
          </Typography>
          {done.map(issue => (
            <Box m={1}>
              <Card key={issue.id} sx={{ width: 200 }} variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                    {issue.id}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {issue.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}