import styled from 'styled-components';
import { FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons

const HeaderWrapper = styled.div`
    background: linear-gradient(135deg, #2c003e, #4b006e);
    color: white;
    padding: 40px 20px;
    text-align: center;
    border-bottom: 5px solid #4CAF50;
`;

const StyledImage = styled.img`
    margin-top: 20px;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
    font-size: 2rem;
    margin: 20px 0 10px;
    font-weight: bold;
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: #f0e6ff;
`;

const ContactDetails = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;

    a {
        color: white;
        text-decoration: none;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: color 0.3s ease;

        &:hover {
            color: #4CAF50;
        }
    }
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <Title>DIVINE SSPIRIT TAROT</Title>
            <Title>Sheenam Goel- Tarot Reader, Numerologist, Astrologer ,Bach Flower Therapist & Spiritual Healer</Title>
            <Subtitle>Discover your destiny, heal your soul</Subtitle>
            <StyledImage 
                src="/sheenuS.jpeg" 
                alt="Beautiful representation" 
            />
            <ContactDetails>
                <a href="https://instagram.com/divinesspirittarot" target="_blank" rel="noopener noreferrer">
                    <FaInstagram /> Instagram
                </a>
                <a href="mailto:your-email@example.com">
                    <FaEnvelope /> sheenamgoel9@gmail.com
                </a>
                <a href="tel:+919034060726">
                    <FaPhone /> +919034060726
                </a>
            </ContactDetails>
        </HeaderWrapper>
    );
}