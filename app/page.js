"use client"
import FAQ from '@/src/components/FAQ';
import Footer from '@/src/components/Footer';
import Hero from '@/src/components/Hero';
import IssuesPage from '@/src/components/Issues';
import Navbar from '@/src/components/Navbar';
import Ratings from '@/src/components/Ratings';
import Services from '@/src/components/Services';
import WalletConnectModals from '@/src/components/WalletConnectModals';
import WhyChooseUs from '@/src/components/WhyChooseUs';
import TickerTape from '@/src/data/TickerTape';
import { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a; /* dark-bg */
  color: #e5e5e5; /* dark-text */
`;

const Main = styled.main`
  /* Add any additional main styles here if needed */
`;

export default function Home() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  return (
    <PageContainer>
      <Navbar />
      <Main>
        <Hero />
        <Ratings />
        <Services  />
          <IssuesPage onConnectWallet={() => setIsWalletModalOpen(!isWalletModalOpen)} />
        <WhyChooseUs />
      </Main>
      <FAQ />
      <Footer />
      <WalletConnectModals 
        isModalOpen={isWalletModalOpen} 
        openModal={setIsWalletModalOpen} 
      />
    </PageContainer>
  );
}