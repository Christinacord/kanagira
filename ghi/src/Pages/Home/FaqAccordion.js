import React from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  return (
    <Box paddingTop={5} paddingBottom={15}>
      <Box marginBottom={4}>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          align={'center'}
        >
          Frequently Asked Questions
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minWidth='70vw'
      >
        {[
          {
            title: 'What is Kanagira?',
            subtitle:
              'Kanagira is a software tool developed by us that allows teams to manage their projects and workflows more efficiently. It provides features for issue tracking, project management, and agile development.',
          },
          {
            title: 'What are some key features of Kanagira?',
            subtitle:
              'Some key features of Kanagira include issue tracking and management, project management, agile development, customizable workflows, reporting and analytics, and integration with other tools.',
          },
          {
            title: 'What is an issue in Kanagira?',
            subtitle:
              "In Kanagira, an issue is a task, bug, or feature request that needs to be addressed by a team. Issues can be created, assigned, and tracked through Kanagira's issue tracking and management features.",
          },
          {
            title: 'What is an agile board in Kanagira?',
            subtitle:
              'An agile board in Kanagira is a visual representation of the tasks and issues that need to be completed for a project.It provides a way for teams to track progress, assign tasks, and manage workflows using an agile methodology.',
          },
          {
            title: 'What is the pricing for Kanagira?',
            subtitle:
              'Kanagira is completely free and you will never be charged for using it.'
          },
        ].map((item, i) => (
          <Box
            component={Accordion}
            key={i}
            padding={1}
            marginBottom={i === item.length - 1 ? 0 : 2}
            borderRadius={2}
            width='80vh'
            margin='auto'
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={`panel1a-header--${i}`}
            >
              <Typography fontWeight={600}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{item.subtitle}</Typography>
            </AccordionDetails>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Faq;
