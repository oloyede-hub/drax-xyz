"use client"
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animations
const blob = keyframes`
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
`;

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

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background-image: url(/background.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

const BackgroundGlow = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  opacity: 0.3;
`;

const Blob = styled.div`
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  mix-blend-mode: multiply;
  filter: blur(64px);
  opacity: 0.7;
  animation: ${blob} 7s infinite;
`;

const BlobBlue = styled(Blob)`
  top: 25%;
  left: 25%;
  background-color: #00d4ff; /* neon-blue */
`;

const BlobPurple = styled(Blob)`
  top: 50%;
  right: 25%;
  background-color: #b026ff; /* neon-purple */
  animation-delay: 2s;
`;

const BlobCyan = styled(Blob)`
  bottom: 25%;
  left: 33.333%;
  background-color: #00fff9; /* neon-cyan */
  animation-delay: 4s;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 56rem;
  margin: 0 auto;
`;

const Headline = styled.h1`
  font-size: 3.75rem;
  font-weight: 800;
  color: white;
  line-height: 1.2;
  margin-bottom: 1rem;
  animation: ${fadeInUp} 1s ease-out;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Subtext = styled.p`
  font-size: 1.25rem;
  color: #d1d5db; /* gray-300 */
  margin-bottom: 2rem;
  animation: ${fadeInUp} 1s ease-out 0.5s backwards;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CTAButton = styled.button`
  position: relative;
  padding: 1rem 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 9999px;
  overflow: hidden;
  background: linear-gradient(to right, #00d4ff, #b026ff);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.6);
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 10;
`;

const Hero = () => {
  return (
    <HeroSection>
      {/* Background Glow/Gradient */}
      <BackgroundGlow>
        <BlobBlue />
        <BlobPurple />
        <BlobCyan />
      </BackgroundGlow>

      <Content>
        {/* Headline */}
        <Headline>
         Your Multichain Gateway to Crypto Excellence
        </Headline>

        {/* Subtext */}
        <Subtext>
          Experience seamless, secure, and intelligent crypto solutions.
        </Subtext>

        {/* CTA Button */}
        <CTAButton>
          <ButtonText className='interact-button'>
            Get Started
          </ButtonText>
        </CTAButton>
      </Content>
    </HeroSection>
  );
};

export default Hero;