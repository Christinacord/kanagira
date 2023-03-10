import React from 'react';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';

const ProfilePicture = styled(Avatar)(({ theme }) => ({
    marginRight: theme.spacing(2),
    width: theme.spacing(40),
    height: theme.spacing(40),
}));

const AboutMe = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
        alignItems: 'flex-start',
            '& > *': {
        marginBottom: theme.spacing(2),
        },
},
}));

const LinkedInLink = styled('a')(({ theme }) => ({
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const WebsiteLink = styled('a')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
    '& > svg': {
        marginRight: theme.spacing(1),
    },
}));

const GitHubLink = styled('a')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
    '& > svg': {
        marginRight: theme.spacing(1),
    },
}));

export default function About() {
    return (
        <>
            <style>{'body { background-color: #1976d2; }'}</style>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, margin: "100px 20 0 0" }}>
                <AboutMe style={{ position: "absolute", top: 80, left: 25 }}>
                    <ProfilePicture
                        alt="Profile Picture"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXxAYV-wgGrMrsCtEaJ-2lsKXcvdx2tbL3CA&usqp=CAU"
                    />
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Ryan Paschen
                        </Typography>
                        <Typography variant="body1">
                            <WebsiteLink href="">
                                Portfolio
                                <LanguageIcon />
                            </WebsiteLink>{' '}
                            <GitHubLink href="https://github.com/Smoovies13">
                                GitHub
                                <GitHubIcon />
                            </GitHubLink>
                            <LinkedInLink href="https://www.linkedin.com/in/ryan-paschen/">
                                LinkedIn
                                <LinkedInIcon />
                            </LinkedInLink>
                        </Typography>
                    </div>
                </AboutMe>
                <AboutMe style={{ position: "absolute", top: 80, right: 25 }}>
                    <ProfilePicture
                        alt="Profile Picture"
                        src="https://media.licdn.com/dms/image/D4E35AQHItwpdV6nhOg/profile-framedphoto-shrink_200_200/0/1662729862658?e=1678827600&v=beta&t=dyrPtgkSgyqdl6CulxnsFiXxBWK41SUQm-IudS6w6u4"
                    />
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Christina Cord
                        </Typography>
                        <Typography variant="body1">
                            <WebsiteLink href="">
                                Portfolio
                                <LanguageIcon />
                            </WebsiteLink>{' '}
                            <GitHubLink href="https://github.com/Smoovies13">
                                GitHub
                                <GitHubIcon />
                            </GitHubLink>
                            <LinkedInLink href="https://www.linkedin.com/in/christinacord/">
                                LinkedIn
                                <LinkedInIcon />
                            </LinkedInLink>
                        </Typography>
                    </div>
                </AboutMe>
                <AboutMe style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <ProfilePicture
                        alt="Profile Picture"
                        src="https://media.licdn.com/dms/image/C4E03AQEG5_3DodyJmA/profile-displayphoto-shrink_200_200/0/1570150894922?e=1683763200&v=beta&t=MsMkLQb2dv5Kiqvok1gLyTrsc9MIsgo7jH4xMdK9CEs"
                    />
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Daniel Im
                        </Typography>
                        <Typography variant="body1">
                            <WebsiteLink href="">
                                Portfolio
                                <LanguageIcon />
                            </WebsiteLink>{' '}
                            <GitHubLink href="https://github.com/dansuim">
                                GitHub
                                <GitHubIcon />
                            </GitHubLink>
                            <LinkedInLink href="https://www.linkedin.com/in/danielsuim/">
                                LinkedIn
                                <LinkedInIcon />
                            </LinkedInLink>
                        </Typography>
                    </div>
                </AboutMe>
                <AboutMe style={{ position: "absolute", bottom: 0, left: 25 }}>
                    <ProfilePicture
                        alt="Profile Picture"
                        src="https://media.licdn.com/dms/image/D5635AQHOYBHxWEtS2Q/profile-framedphoto-shrink_200_200/0/1677100863476?e=1678827600&v=beta&t=Bb9MBP-YXEpOVI3z3Odx1MEcGtYHSAlSvKgURJtwFAU"
                    />
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Ian Li
                        </Typography>
                        <Typography variant="body1">
                            <WebsiteLink href="">
                                Portfolio
                                <LanguageIcon />
                            </WebsiteLink>{' '}
                            <GitHubLink href="https://github.com/Smoovies13">
                                GitHub
                                <GitHubIcon />
                            </GitHubLink>
                            <LinkedInLink href="https://www.linkedin.com/in/ian-z-li/">
                                LinkedIn
                                <LinkedInIcon />
                            </LinkedInLink>
                        </Typography>
                    </div>
                </AboutMe>
                <AboutMe style={{ position: "absolute", bottom: 0, right: 25 }}>
                    <ProfilePicture
                        alt="Profile Picture"
                        src="https://avatars.githubusercontent.com/u/108601108?s=400&u=d17a05669e566e7d97d50200e1ac35b6c1f3c9df&v=4"
                    />
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Joe Biedermann
                        </Typography>
                        <Typography variant="body1">
                            <WebsiteLink href="">
                                Portfolio
                                <LanguageIcon />
                            </WebsiteLink>{' '}
                            <GitHubLink href="https://github.com/Smoovies13">
                                GitHub
                                <GitHubIcon />
                            </GitHubLink>
                            <LinkedInLink href="https://www.linkedin.com/in/joe-biedermann/">
                                LinkedIn
                                <LinkedInIcon />
                            </LinkedInLink>
                        </Typography>
                    </div>
                </AboutMe>
            </div>
        </>
    )
}

