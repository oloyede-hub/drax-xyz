"use client"
import React, { useEffect } from 'react';
import styled from 'styled-components';
import TickerTape from '../data/TickerTape';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  background-color: rgba(26, 26, 26, 0.9); /* dark-bg with opacity */
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #00d4ff; /* neon-blue */
  letter-spacing: 0.05em;
`;

const ConnectButton = styled.button`
  position: relative;
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  border: none;
  border-radius: 9999px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
`;

const ButtonGradient = styled.span`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #00d4ff, #b026ff);
  transition: all 0.3s ease-out;

  ${ConnectButton}:hover & {
    transform: scale(1.05, 1.1);
  }
`;

const ButtonText = styled.span`
  position: relative;
  z-index: 10;
  transition: color 0.3s ease;

  ${ConnectButton}:hover & {
    color: white;
  }
`;

const Navbar = () => {


  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/qunit-2.19.4.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
  return (
    <Nav>
      <TickerTape />
      <Container>
        {/* Logo/Title */}
        <Logo>
          CryptoDr
        </Logo>

        {/* Connect Wallet Button */}
        <ConnectButton>
          <ButtonGradient />
          <ButtonText  className="interact-button">
            Connect Wallet
          </ButtonText>
        </ConnectButton>
      </Container>
    </Nav>
  );
};

export default Navbar;