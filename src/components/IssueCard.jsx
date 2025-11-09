import React from 'react';
import styled from 'styled-components';
import { FaClock } from 'react-icons/fa';

const IssueCard = ({
onConnectWallet,
  icon = <FaClock />,
  title,
  description,
}) => {
  return (
    <Card onClick={onConnectWallet}>
      <CornerTL />
      <CornerTR />
      <CornerBL />
      <CornerBR />

      <IconBox>{icon}</IconBox>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};

export default IssueCard;

// ================== styled-components ==================

const Card = styled.div`
  position: relative;
  background: linear-gradient(135deg, #1a2332 0%, #0f1924 100%);
  border-radius: 1.25rem;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 380px;
  border: 1px solid rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;
  color: #fff;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(16, 185, 129, 0.4);
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: #1e2d42;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.35rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #8b92a3;
  line-height: 1.6;
`;

// =============== Corner Accent Elements ===============

const CornerBase = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2.5px solid #10b981;
  opacity: 0.7;
  gap: 1rem
`;

const CornerTL = styled(CornerBase)`
  top: -5px;
  left: -5px;
  border-right: none;
  border-bottom: none;
  border-radius: 6px 0 0 0;
`;

const CornerTR = styled(CornerBase)`
  top: -5px;
  right: -5px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 6px 0 0;
`;

const CornerBL = styled(CornerBase)`
  bottom: -5px;
  left: -5px;
  border-top: none;
  border-right: none;
  border-radius: 0 0 0 6px;
`;

const CornerBR = styled(CornerBase)`
  bottom: -5px;
  right: -5px;
  border-top: none;
  border-left: none;
  border-radius: 0 0 6px 0;
`;