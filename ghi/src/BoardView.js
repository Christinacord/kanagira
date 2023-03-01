import React, { useEffect, useState } from "react";
import { useToken } from "./auth.js";
import { useNavigate, useParams } from "react-router-dom";

function BoardView() {
  const [issues, setIssues] = useState([]);

  const { board_id } = useParams();

  const { token } = useToken();

  useEffect(() => {

    const fetchIssues = async () => {
      const issuesData = [];
      const swimlaneStartId = ((board_id - 1) * 5) + 1;
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
          issuesData.push(...data);
        }
      }
      setIssues(issuesData);
    };

    fetchIssues();
}, []);

  console.log(issues);

  if (!token) {
    return <div>Please Log In</div>;
  }

  return (
    <>
    </>
  );
}

export default BoardView;
