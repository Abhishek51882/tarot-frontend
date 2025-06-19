import styled from 'styled-components';

const PortfolioWrapper = styled.div`
    background: #f8f8f8;
    padding: 40px 20px;
    text-align: center;
`;

const PortfolioTitle = styled.h2`
    color: #2c003e;
    margin-bottom: 20px;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const Card = styled.div`
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
`;

const CardImage = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
`;

const CardTitle = styled.h3`
    color: #2c003e;
    margin: 15px 0 10px;
`;

const CardDescription = styled.p`
    color: #555;
    font-size: 14px;
    margin-bottom: 10px;
`;

const CardAchievement = styled.p`
    color: #2c003e;
    font-weight: bold;
    font-size: 14px;
`;

export default function Portfolio() {
    const portfolioItems = [
        {
            image: '/tarot-card.avif',
            title: 'Tarot Reading',
            description: 'Discover the secrets of your life through Tarot.',
            achievement: 'Certified Tarot Reader',
        },
        {
            image: '/numerology.jpeg',
            title: 'Numerology',
            description: 'Decode the numbers that shape your destiny.',
            achievement: 'Expert in Numerology',
        },
        {
            image: '/vastu.jpeg',
            title: 'Vastu Consultation',
            description: 'Balance your home’s energy with Vastu.',
            achievement: 'Vastu Shastra Specialist',
        },
        {
            image: '/kaali.jpeg',
            title: 'MahaKali Healing',
            description: 'Experience spiritual transformation and inner peace through the divine energy of Goddess Kali.',
            achievement: 'Certified MahaKali Healing Practitioner with profound expertise in energy healing.',
        },
        {
            image: '/kunli.png',
            title: 'Kundali Analyse',
            description: 'Unlock the mysteries of your birth chart and gain insights into your life’s purpose and challenges.',
            achievement: 'Astrological Expert with 5+ Years of Experience in occult.',
        },
    ];

    return (
        <PortfolioWrapper>
            <PortfolioTitle>Portfolio</PortfolioTitle>
            <CardGrid>
                {portfolioItems.map((item, index) => (
                    <Card key={index}>
                        <CardImage src={item.image} alt={item.title} />
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                        <CardAchievement>{item.achievement}</CardAchievement>
                    </Card>
                ))}
            </CardGrid>
        </PortfolioWrapper>
    );
}