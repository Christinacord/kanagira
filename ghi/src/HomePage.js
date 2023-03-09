import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Container } from '@mui/material';


const globalStyles = css`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-image: url('https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80');
    background-size: cover;
  }
`;

const ContainerWrapper = styled(Container)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 48px;
  text-align: center;
  animation: fadeIn 2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const FeatureListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1in;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 1in;
`;

const FeatureTitle = styled.h3`
  text-align: left;
  font-size: 36px;
  margin-right: 0.5in;
  margin-bottom: 0;
  padding-right: 0.5in;
  margin-left: 1in;
`;

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
        <FeatureListContainer>
          <FeatureTitle>Features:</FeatureTitle>
          <FeatureList>
            <FeatureItem>100% free!</FeatureItem>
            <FeatureItem>Create team boards</FeatureItem>
            <FeatureItem>Track tasks from start to finish</FeatureItem>
            <FeatureItem>Easily manage workflow</FeatureItem>
            <FeatureItem>Deliver better business outcomes</FeatureItem>
          </FeatureList>
        </FeatureListContainer>
        <h1 style={{ marginTop: '2in' }}>"Don't trust your memory, trust Kanagira!."</h1>
      </ContainerWrapper>
    </>
  );
}

export default HomePage;
