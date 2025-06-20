import styled from 'styled-components';
import { FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons

const FooterWrapper = styled.div`
    background: linear-gradient(135deg, #4b006e, #2c003e);
    color: white;
    padding: 20px;
    text-align: center;
    border-top: 5px solid #4CAF50;
`;

const FooterContent = styled.div`
    margin-bottom: 20px;
`;

const FooterTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: bold;
`;

const FooterSubtitle = styled.p`
    font-size: 1rem;
    margin-bottom: 20px;
    color: #f0e6ff;
`;

const FooterContactDetails = styled.div`
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

const Copyright = styled.p`
    font-size: 0.9rem;
    margin-top: 20px;
    color: #f0e6ff;
`;

export default function Footer() {
    return (
        <FooterWrapper>
            <FooterContent>
                <FooterTitle>DIVINE SSPIRIT TAROT</FooterTitle>
                <FooterSubtitle>Guiding you through the mysteries of life</FooterSubtitle>
                <FooterContactDetails>
                    <a href="https://instagram.com/divinesspirittarot" target="_blank" rel="noopener noreferrer">
                        <FaInstagram /> Instagram
                    </a>
                    <a href="mailto:sheenamgoel9@gmail.com">
                        <FaEnvelope /> sheenam goel
                    </a>
                    <a href="tel:+919034060726">
                        <FaPhone /> +919034060726
                    </a>
                </FooterContactDetails>
            </FooterContent>
            <Copyright>
                © {new Date().getFullYear()} Divine Spirit Tarot. All rights reserved.
            </Copyright>
        </FooterWrapper>
    );
}