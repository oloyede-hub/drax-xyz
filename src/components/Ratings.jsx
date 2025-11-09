import React from 'react';
import styled from 'styled-components';
import { FaUsers, FaStar, FaShieldAlt } from 'react-icons/fa';

const statsData = [
  {
    icon: <FaUsers />,
    text: "50,000+ Users Helped",
    color: "#00d4ff", // neon-blue
  },
  {
    icon: <FaStar />,
    text: "4.9/5 Rating",
    color: "#fbbf24", // yellow/gold
  },
  {
    icon: <FaShieldAlt />,
    text: "Bank-Level Security",
    color: "#10b981", // green
  },
];

const StatsBar = styled.div`
  background-color: rgba(10, 10, 10, 0.95);
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #d1d5db;
  font-size: 0.95rem;
  font-weight: 500;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const IconWrapper = styled.div`
  color: ${props => props.color};
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

const StatText = styled.span`
  white-space: nowrap;
`;

const Ratings = () => {
  return (
    <StatsBar>
      <Container>
        {statsData.map((stat, index) => (
          <StatItem key={index}>
            <IconWrapper color={stat.color}>
              {stat.icon}
            </IconWrapper>
            <StatText>{stat.text}</StatText>
          </StatItem>
        ))}
      </Container>
    </StatsBar>
  );
};

export default Ratings;