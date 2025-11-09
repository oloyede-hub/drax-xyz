import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: "How can I get help if I encounter an issue with my wallet?",
    answer: "Our support team is available 24/7 to assist you with any wallet-related issues. You can contact us through our support form, live chat, or email, and we'll provide personalized assistance for your specific problem.",
  },
  {
    question: "What measures do you take to ensure the security of my wallet and transactions?",
    answer: "We implement bank-level security measures including end-to-end encryption, multi-factor authentication, cold storage for assets, regular security audits, and advanced fraud detection systems to protect your wallet and transactions.",
  },
  {
    question: "Is your platform easy to use for beginners?",
    answer: "Absolutely! Our platform is designed with user-friendliness in mind. We offer an intuitive interface, step-by-step guides, video tutorials, and 24/7 customer support to help beginners navigate the world of cryptocurrency with confidence.",
  },
  {
    question: "Can I access your services from anywhere in the world?",
    answer: "Yes, our platform is accessible globally. You can access your wallet and use our services from anywhere with an internet connection, on any device including desktop, mobile, and tablet.",
  },
];

const FAQSection = styled.section`
  padding: 5rem 0;
  background-color: #0f1419;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
`;

const LeftColumn = styled.div``;

const RightColumn = styled.div``;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #9ca3af;
  margin-bottom: 2rem;

  span {
    text-decoration: underline;
    color: white;
  }
`;

const Description = styled.p`
  color: #9ca3af;
  line-height: 1.75;
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 500;
  font-size: 0.95rem;
`;

const Input = styled.input`
  background-color: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: rgba(20, 20, 20, 1);
  }
`;

const TextArea = styled.textarea`
  background-color: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
  color: white;
  font-size: 0.95rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: rgba(20, 20, 20, 1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(to right, #3b82f6, #2563eb);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled.div`
  background-color: rgba(20, 20, 20, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  transition: all 0.3s ease;

//   &:hover {
//     color: #3b82f6;
//   }
`;

const AccordionContent = styled.div`
  max-height: ${props => props.$isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AccordionBody = styled.div`
  padding: 0 1.5rem 1.25rem 1.5rem;
  color: #9ca3af;
  line-height: 1.75;
`;

const IconWrapper = styled.span`
  color: #3b82f6;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleSubmit = () => {
    if (formData.email && formData.message) {
      console.log('Form submitted:', formData);
      alert('Message sent! We will get back to you soon.');
      setFormData({ email: '', message: '' });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FAQSection>
      <Container>
        <LeftColumn>
          <Title>FAQ</Title>
          <Subtitle>Your questions <span>answered.</span></Subtitle>
          <Description>
            Let's do our best to answer your most frequently asked questions. Can't find
            the answer you're looking for? Please chat to our friendly team!
          </Description>

          <FormWrapper>
            <FormGroup>
              <Label>Your Email*</Label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Your Message*</Label>
              <TextArea
                name="message"
                placeholder="Tell us about your wallet issue..."
                value={formData.message}
                onChange={handleChange}
              />
            </FormGroup>

            <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          </FormWrapper>
        </LeftColumn>

        <RightColumn>
          <AccordionList>
            {faqData.map((faq, index) => (
              <AccordionItem key={index}>
                <AccordionHeader onClick={() => toggleAccordion(index)}>
                  {faq.question}
                  <IconWrapper>
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </IconWrapper>
                </AccordionHeader>
                <AccordionContent $isOpen={openIndex === index}>
                  <AccordionBody>{faq.answer}</AccordionBody>
                </AccordionContent>
              </AccordionItem>
            ))}
          </AccordionList>
        </RightColumn>
      </Container>
    </FAQSection>
  );
};

export default FAQ;