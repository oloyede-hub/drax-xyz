"use client"
import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaTelegramPlane, FaDiscord } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: #1a1a1a; /* dark-bg */
  padding: 3rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  color: #9ca3af; /* gray-400 */
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Copyright = styled.p`
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #00d4ff; /* neon-blue */
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  font-size: 1.5rem;
  color: inherit;
  transition: color 0.3s ease;

  &:hover {
    color: #00d4ff; /* neon-blue */
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          {/* Copyright */}
          <Copyright>&copy; {new Date().getFullYear()} CryptoDr. All rights reserved.</Copyright>

          {/* Quick Links */}
          <QuickLinks>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </QuickLinks>

          {/* Social Icons */}
          <SocialIcons>
            <SocialLink href="#">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="#">
              <FaTelegramPlane />
            </SocialLink>
            <SocialLink href="#">
              <FaDiscord />
            </SocialLink>
          </SocialIcons>
        </FooterContent>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;