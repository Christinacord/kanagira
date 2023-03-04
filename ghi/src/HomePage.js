import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Container } from '@mui/material';


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

function HomePage() {
    return (
        <>
            <Global styles={globalStyles} />
            <ContainerWrapper>
                <Header>Concept to Launch in Record Time</Header>
                <Image src="https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80" />
                <div>
                    <h3>Features:</h3>
                    <FeatureList>
                        <FeatureItem>100% free!</FeatureItem>
                        <FeatureItem>Create team boards</FeatureItem>
                        <FeatureItem>Track tasks from start to finish</FeatureItem>
                        <FeatureItem>Easily manage workflow</FeatureItem>
                        <FeatureItem>Deliver better business outcomes</FeatureItem>
                    </FeatureList>
                </div>
                <h1>"Don't trust your memory, trust Kanagira!."</h1>
            </ContainerWrapper>
        </>
    );
}

export default HomePage;
