import React, { useEffect, useState } from "react";
import { useToken } from "./auth.js";
import { useNavigate, useParams } from "react-router-dom";


function BoardView() {
  const [issues, setIssues] = useState([]);

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
      count = 1;
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

  console.log(issues);

  if (!token) {
    return <div>Please Log In</div>;
  }

  return (
    <>
      <div label="board title">
      <tbody>
        {issues.map(issue => {
          return (
            <tr key={issue.id}>
              <td>{issue.name}</td>
              <td>{issue.description}</td>
              <td>{issue.type}</td>
              <td>{issue.difficulty}</td>
              <td>{issue.creator}</td>
              <td>{issue.assignee}</td>
            </tr>
          );
        })}
      </tbody>

      </div>
    </>
  );
}

export default BoardView;
