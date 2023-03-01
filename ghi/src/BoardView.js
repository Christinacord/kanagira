import { useToken } from "./auth.js";
import { useNavigate, useParams } from "react-router-dom";

function BoardView() {

  const { board_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    const issuesUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/boards/${board_id}/swim_lane`;
    const fetchConfig = {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(issuesUrl, fetchConfig);
    if (response.ok) {
      const entry = await response.json();
      console.log("this is the entry", entry);
    }
  };


  const { token } = useToken();
  if (!token) {
    return <div>Please Log In</div>;
  }


  

  return (
    <></>
  );
}

export default BoardView;
