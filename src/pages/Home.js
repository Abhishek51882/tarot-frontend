import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

import Header from '../components/Header';
import ServiceCard from '../components/ServiceCard';
import Portfolio from '../components/Portfolio';
import api from '../services/api';
import Footer from '../components/Footer';

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px;
  justify-items: center;
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 20px;
`;

const HeadingText = styled.h2`
  font-size: 2rem;
  color: #4CAF50;
  font-weight: bold;
`;

const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 600px;
  max-width: 90%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const FormField = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  input {
    width: 100%;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function Home() {
  const [services, setServices] = useState([]);
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Service modal
  const [newServiceData, setNewServiceData] = useState({
    title: '',
    price: '',
    discountedPrice: '',
    description: '',
    image: null, // Image file
  });
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch services
  const updateServices = () => {
    api.get('/services')
      .then((res) => {
        setServices(res.data);
        console.log('Updated Services:', res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Initial fetch of services
    updateServices();

    // Extract user details from token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token
        setUserDetails({
          id: decodedToken.id,
          role: decodedToken.role,
        });
        console.log('User Details:', decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.reload(); // Refresh the page
  };

  const handleNewServiceInputChange = (e) => {
    const { name, value } = e.target;
    setNewServiceData({ ...newServiceData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewServiceData({ ...newServiceData, image: file });
  };

  const handleAddNewService = async () => {
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData(); // Create FormData object

      // Append form data fields
      formDataToSend.append('title', newServiceData.title);
      formDataToSend.append('price', newServiceData.price);
      formDataToSend.append('discountedPrice', newServiceData.discountedPrice);
      formDataToSend.append('description', newServiceData.description);

      // Append image file
      if (newServiceData.image) {
        formDataToSend.append('image', newServiceData.image);
      }

      const response = await api.post('/services', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('New service added successfully');
        updateServices(); // Refresh the service list
        setIsAddModalOpen(false); // Close modal
      }
    } catch (error) {
      console.error('Error adding new service:', error);
      alert('Failed to add new service');
    }
  };

  return (
    <>
      <Header />
      <Portfolio />
      <SectionHeading>
    
        <HeadingText>Book Your Session Today and Transform Your Life!</HeadingText>
        {userDetails?.role === 'admin' && (
          <>
            <AddButton onClick={() => setIsAddModalOpen(true)}>Add Service</AddButton>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        )}
      </SectionHeading>
      <ServicesContainer>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            userRole={userDetails?.role}
            updateServices={updateServices} // Pass updateServices to ServiceCard
          />
        ))}
      </ServicesContainer>

      {isAddModalOpen && (
        <>
          <Overlay onClick={() => setIsAddModalOpen(false)} />
          <Modal>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Service</h2>
            <form>
              <FormField>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={newServiceData.title}
                  onChange={handleNewServiceInputChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={newServiceData.price}
                  onChange={handleNewServiceInputChange}
                  required
                />
              </FormField>
              <FormField>
                <label>Discounted Price:</label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={newServiceData.discountedPrice}
                  onChange={handleNewServiceInputChange}
                />
              </FormField>
              <FormField>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={newServiceData.description}
                  onChange={handleNewServiceInputChange}
                />
              </FormField>
              <FormField>
                <label>Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </FormField>
              <Button type="button" onClick={handleAddNewService}>
                Add Service
              </Button>
            </form>
          </Modal>
        </>
      )}
      <Footer/>
    </>
  );
}

export default Home;