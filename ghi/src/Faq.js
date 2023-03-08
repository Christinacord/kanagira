import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Define global styles

const globalStyles = css`
body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
}
`;

// Define styles for the container
const ContainerWrapper = styled(Container)`
padding: 20px;
display: flex;
flex-direction: column;
align-items: center;
`;

// Define styles for the header
const Header = styled.h1`
font-size: 48px;
text-align: center;
`;

// Define styles for the image
const Image = styled.img`
display: block;
margin: 0 auto;
width: 100%;
max-width: 800px;
`;

// Define styles for the feature list
const FeatureList = styled.ul`
list-style: none;
padding: 0;
margin: 0;
`;

// Define styles for the feature items
const FeatureItem = styled.li`
margin: 10px 0;
font-size: 24px;
`;


export default function Faq() {
    return (
        <div style={{
            background: `url(https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80) no-repeat center center fixed`,
            backgroundSize: "100% 100%",
            padding: "20px",
            minHeight: "100vh" // added to ensure the image covers the entire viewport height
        }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0)', padding: '10px' }}>
                    <p style={{ margin: '0', fontSize: '50px', fontWeight: 'bold', textAlign: 'center' }}>
                        Concept to Launch in Record Time
                    </p>
                </div>
            </Box>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Q: What is Kanagira ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        A : Kanagira is a software tool developed by us that allows teams to manage their projects and workflows more efficiently.It provides features for issue tracking, project management, and agile development.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Q: What are some key features of Kanagira ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        A : Some key features of Kanagira include issue tracking and management, project management, agile development, customizable workflows, reporting and analytics, and integration with other tools.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Q: What is an issue in Kanagira ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        A : In Kanagira, an issue is a task, bug, or feature request that needs to be addressed by a team.Issues can be created, assigned, and tracked through Kanagira's issue tracking and management features.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Q: What is an agile board in Kanagira ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        A : An agile board in Kanagira is a visual representation of the tasks and issues that need to be completed for a project.It provides a way for teams to track progress, assign tasks, and manage workflows using an agile methodology.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Q: What is the pricing for Kanagira ?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        A : Kanagira is 100% FREE!
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0)', padding: '10px' }}>
                    <p style={{ margin: '0', fontSize: '35px', fontWeight: 'bold', textAlign: 'center' }}>
                        "Don't trust your memory, trust Kanagira!."
                    </p>
                </div>
            </Box>
        </div>
    );
}