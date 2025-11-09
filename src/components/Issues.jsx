import React from 'react';
import styled from 'styled-components';
import IssueCard from './IssueCard';
import { issues } from '@/constants/issues';


export default function IssuesPage({onConnectWallet}) {
  const chunkSize = 9;
  const issueChunks = [];
  for (let i = 0; i < issues.length; i += chunkSize) {
    issueChunks.push(issues.slice(i, i + chunkSize));
  }

  return (
    <Wrapper>
      <Header>
        <h1>
          Make Your <span>Selection Below:</span>
        </h1>
        <p>Choose the Issue Affecting Your Wallet for Quick Assistance!</p>
      </Header>

      {issueChunks.map((chunk, chunkIndex) => (
        <Grid key={chunkIndex} style={{ marginBottom: chunkIndex < issueChunks.length - 1 ? '9rem' : '0' }}>
          {chunk.map((issue, index) => (
            <IssueCard
            key={index}
            icon={issue.icon}
            title={issue.title}
            description={issue.desc}
            onConnectWallet={onConnectWallet}
            />
          ))}
        </Grid>
      ))}
    </Wrapper>
  );
}

// =============== styled-components ===============

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #030b11;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    span {
      text-decoration: underline;
      text-underline-offset: 5px;
    }
  }

  p {
    margin-top: 0.5rem;
    color: #9ba3af;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  background-color: #0b1621;
  border: 1px solid rgba(0, 255, 204, 0.15);
  border-radius: 0.8rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #00ffc8;
    transform: translateY(-5px);
    box-shadow: 0 0 15px rgba(0, 255, 204, 0.15);
  }
`;

const IconBox = styled.div`
  font-size: 1.5rem;
  background-color: rgba(0, 255, 204, 0.1);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #00ffc8;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
`;

const Desc = styled.p`
  margin-top: 0.3rem;
  font-size: 0.9rem;
  color: #b0bac4;
`;

