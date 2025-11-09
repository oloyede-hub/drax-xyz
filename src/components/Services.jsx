
"use client"
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaExchangeAlt, FaStore, FaChartLine, FaCoins } from 'react-icons/fa';

const servicesData = [
  {
    icon: <FaExchangeAlt />,
    title: "Token Exchange",
    description: "Trade your favorite cryptocurrencies with lightning speed and low fees.",
    color: "#00d4ff", // neon-blue
  },
  {
    icon: <FaStore />,
    title: "NFT Marketplace",
    description: "Discover, buy, and sell unique digital collectibles on our vibrant marketplace.",
    color: "#b026ff", // neon-purple
  },
  {
    icon: <FaCoins />,
    title: "DeFi Staking",
    description: "Earn passive income by staking your crypto assets in secure DeFi protocols.",
    color: "#00fff9", // neon-cyan
  },
  {
    icon: <FaChartLine />,
    title: "Analytics Dashboard",
    description: "Gain insights into market trends and your portfolio performance with advanced analytics.",
    color: "#00d4ff", // neon-blue
  },
];

// Keyframe animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ServicesSection = styled.section`
  padding: 5rem 0;
  background-color: #0f0f0f; /* dark-card */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeInUp} 1s ease-out;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ServiceCard = styled.div`
  background-color: #1a1a1a; /* dark-bg */
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  font-size: 2.25rem;
  color: ${props => props.color};
`;

const ServiceTitle = styled.h3`
  font-size: 1.875rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  ${ServiceCard}:hover & {
    color: #00d4ff; /* neon-blue */
  }
`;

const ServiceDescription = styled.p`
  color: #9ca3af; /* gray-400 */
  text-align: center;
  line-height: 1.75;
`;

const Services = ({onConnectWallet}) => {
  return (
    <ServicesSection>
      <Container>
        <Title>
          Our Services
        </Title>
        <Grid>
          {servicesData.map((service, index) => (
            <ServiceCard onClick={onConnectWallet} key={index}>
              <IconWrapper color={service.color}>
                {service.icon}
              </IconWrapper>
              <ServiceTitle>
                {service.title}
              </ServiceTitle>
              <ServiceDescription>
                {service.description}
              </ServiceDescription>
            </ServiceCard>
          ))}
        </Grid>
      </Container>
    </ServicesSection>
  );
};

export default Services;