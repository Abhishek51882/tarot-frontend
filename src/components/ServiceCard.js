import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import api from '../services/api';
import './ServiceCard.css';

function ServiceCard({ service, userRole, updateServices }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("isPaymentDone", isPaymentDone)

  const [formData, setFormData] = useState({
    title: service.title,
    price: service.price,
    discountedPrice: service.discountedPrice,
    description: service.description,
    serviceType: service.serviceType || 'general',
    image: null,
  });

  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    placeOfBirth: '',
    timeOfBirth: '',
    currentCity: '',
    questions: '',
  });

  const paymentDetails = {
    upiId: "sejalgoel31@okaxis",
    accountNumber: "923010034966412",
    accountName: "Sheenam Verma",
    ifscCode: "UTIB0002388",
    bankName: "Axis Bank",
    contactNumber: "+91 90340 60726",
    amount: service.discountedPrice > 0 ? service.discountedPrice : service.price,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      formDataToSend.append('title', formData.title);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('discountedPrice', formData.discountedPrice);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('serviceType', formData.serviceType);

      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await api.put(`/services/${service.id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Service updated successfully');
        updateServices();
        setIsEditModalOpen(false);
      } else {
        alert('Failed to update service');
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await api.delete(`/services/${service.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Service deleted successfully');
        updateServices();
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("entering handle payment")
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.dob) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    console.log("entering handle payment2")
    try {
      const response = await api.post('/bookings', {
        ...bookingData,
        serviceId: service.id,
        serviceName: service.title,
        amount: paymentDetails.amount,
      });
      console.log('Booking response:', response);

      if (response.status === 201) {
        setIsPaymentDone(true);
      } else {
        alert('Failed to book session');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error processing booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsBookModalOpen(false);
    setIsEditModalOpen(false);
    setIsPaymentDone(false);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      dob: '',
      placeOfBirth: '',
      timeOfBirth: '',
      currentCity: '',
      questions: '',
    });
  };

  return (
    <>
      <div className="service-card">
        <div className="image-container">
          <img
            className="service-image"
            src={service.imageUrl || 'https://via.placeholder.com/350'}
            alt={service.title}
          />
        </div>
        <div className="card-content">
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.description || 'No description available.'}</p>
          <div className="price-container">
            {service.discountedPrice > 0 ? (
              <>
                <span className="original-price">₹{service.price}</span>
                <span className="discounted-price">₹{service.discountedPrice}</span>
              </>
            ) : (
              <span className="price">₹{service.price}</span>
            )}
          </div>
          <button className="book-button" onClick={() => setIsBookModalOpen(true)}>
            Book Session
          </button>
          {userRole === 'admin' && (
            <div className="admin-controls">
              <button className="admin-button edit" onClick={() => setIsEditModalOpen(true)}>
                Edit
              </button>
              <button
                className="admin-button delete"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this service?')) {
                    handleDelete();
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2 className="modal-title">Edit Service</h2>
            <form className="modal-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Discounted Price:</label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <button className="modal-button" onClick={handleEdit}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Book Session Modal */}
      {isBookModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            {!isPaymentDone ? (
              <>
                <h2 className="modal-title">Book Your Session</h2>
                <form className="modal-form">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleBookingInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleBookingInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleBookingInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      type="date"
                      name="dob"
                      value={bookingData.dob}
                      onChange={handleBookingInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Place of Birth:</label>
                    <input
                      type="text"
                      name="placeOfBirth"
                      value={bookingData.placeOfBirth}
                      onChange={handleBookingInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Time of Birth:</label>
                    <input
                      type="time"
                      name="timeOfBirth"
                      value={bookingData.timeOfBirth}
                      onChange={handleBookingInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Current City:</label>
                    <input
                      type="text"
                      name="currentCity"
                      value={bookingData.currentCity}
                      onChange={handleBookingInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Questions:</label>
                    <textarea
                      name="questions"
                      value={bookingData.questions}
                      onChange={handleBookingInputChange}
                    />
                  </div>
                  <button
                    className="modal-button"
                    onClick={(e) => {
                      console.log("Proceed to Payment button clicked");
                      handlePayment(e);
                    }}
                  >
                    Proceed to Payment
                  </button>
                </form>
              </>
            ) : (
              <div className="payment-success">
                <h3>Booking Confirmed!</h3>
                <p>Your session has been booked successfully. Please complete the payment.</p>
                <div className="payment-methods">
                  <div className="payment-method">
                    <h4>UPI Payment</h4>
                    <QRCodeCanvas
                      value={`upi://pay?pa=${paymentDetails.upiId}&pn=${paymentDetails.accountName}&am=${paymentDetails.amount}&cu=INR`}
                      size={160}
                      level="H"
                    />
                    <p>UPI ID: {paymentDetails.upiId}</p>
                    <p>Amount: ₹{paymentDetails.amount}</p>
                  </div>
                  <div className="payment-method">
                    <h4>Bank Transfer</h4>
                    <p>Account Name: {paymentDetails.accountName}</p>
                    <p>Account Number: {paymentDetails.accountNumber}</p>
                    <p>Bank Name: {paymentDetails.bankName}</p>
                    <p>IFSC Code: {paymentDetails.ifscCode}</p>
                    <p>Amount: ₹{paymentDetails.amount}</p>
                  </div>
                  <p>After payment, please share screenshot on whatsapp to <strong> +91 934060726 </strong> for confirmation</p>
                </div>
                <button className="modal-button" onClick={closeModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ServiceCard;