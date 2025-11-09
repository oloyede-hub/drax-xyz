import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaMobileAlt, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const featuresData = [
  {
    icon: <FaMobileAlt />,
    title: "User-Friendly Platform",
    description: "Built with you in mind, our intuitive platform makes navigating and solving issues straightforward and stress-free.",
    bgColor: "#1e3a5f", // dark blue
    iconColor: "#3b82f6", // blue
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    description: "Our dedicated team is always available, around the clock, to provide you with expert assistance whenever you need it.",
    bgColor: "#1a4d3a", // dark green
    iconColor: "#10b981", // green
  },
  {
    icon: <FaShieldAlt />,
    title: "Trusted & Secure",
    description: "We prioritize your safety by offering a secure and reliable platform that you can trust for all your needs.",
    bgColor: "#3d2b5f", // dark purple
    iconColor: "#8b5cf6", // purple
  },
];

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

const WhyChooseSection = styled.section`
  padding: 5rem 0;
  background-color: #0a0a0a;
  position: relative;
  overflow: hidden;
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
  margin-bottom: 4rem;
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
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background-color: rgba(20, 20, 20, 0.6);
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${(props) => props.$iconColor};
  background-color: ${(props) => props.$bgColor};
  border-radius: 1rem;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
`;

const FeatureDescription = styled.p`
  color: #9ca3af;
  line-height: 1.75;
  font-size: 0.95rem;
`;

const WhyChooseUs = () => {
  return (
    <WhyChooseSection>
      <Container>
        <Title>Why Choose Us?</Title>
        <Grid>
          {featuresData.map((feature, index) => (
            <FeatureCard key={index}>
              <IconWrapper $bgColor={feature.bgColor} $iconColor={feature.iconColor}>
                {feature.icon}
              </IconWrapper>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </Grid>
      </Container>
    </WhyChooseSection>
  );
};

export default WhyChooseUs;