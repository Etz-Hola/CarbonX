import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// Wood-style font import (using Google Fonts)
// You can replace 'Lumberjack' with another wood font if needed
import '@fontsource/lumberjack';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const LandingPageContainer = styled.div`
  font-family: 'Lumberjack', sans-serif;
  color: #333;
  background-color: #f9f5e8;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 1s ease-in;
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  text-decoration: none;
  color: #5c3d2e;
  font-size: 1.2rem;
  transition: color 0.3s;
  &:hover {
    color: #8b5a2b;
  }
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 60px 20px;
  animation: ${fadeIn} 1.5s ease-in;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #5c3d2e;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
  color: #8b5a2b;
`;

const ConnectButton = styled.button`
  background-color: #8b5a2b;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #5c3d2e;
  }
`;

const Section = styled.section`
  padding: 40px 20px;
  margin: 20px 0;
  animation: ${slideIn} 1s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #5c3d2e;
  margin-bottom: 20px;
`;

const SectionContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  margin-top: 40px;
  color: #5c3d2e;
  animation: ${fadeIn} 1s ease-in;
`;

const LandingPage: React.FC = () => {
  return (
    <LandingPageContainer>
      <Nav>
        <NavLink to="#hero">Home</NavLink>
        <NavLink to="#about">About</NavLink>
        <NavLink to="#features">Features</NavLink>
        <NavLink to="#how-it-works">How It Works</NavLink>
      </Nav>

      <HeroSection id="hero">
        <Title>Welcome to CarbonX</Title>
        <Subtitle>Explore the future of sustainable energy</Subtitle>
        <ConnectButton>Connect Wallet</ConnectButton>
      </HeroSection>

      <Section id="about">
        <SectionTitle>About Us</SectionTitle>
        <SectionContent>
          CarbonX is a platform dedicated to promoting sustainable energy solutions. We help users connect, explore, and contribute to a greener future.
        </SectionContent>
      </Section>

      <Section id="features">
        <SectionTitle>Features</SectionTitle>
        <SectionContent>
          Our platform offers real-time analytics, community engagement, and seamless wallet integration to enhance your experience.
        </SectionContent>
      </Section>

      <Section id="how-it-works">
        <SectionTitle>How It Works</SectionTitle>
        <SectionContent>
          Simply connect your wallet, explore our features, and start contributing to a sustainable future with CarbonX.
        </SectionContent>
      </Section>

      <Footer>
        <p>© 2023 CarbonX. All rights reserved.</p>
      </Footer>
    </LandingPageContainer>
  );
};

export default LandingPage;
