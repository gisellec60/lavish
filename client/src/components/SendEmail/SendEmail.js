import React, { useState } from 'react';

const MyComponent = (parentObj) => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <label>To:</label>
      <input type="email" name="to" value={emailData.to} onChange={handleInputChange} />

      <label>Subject:</label>
      <input type="text" name="subject" value={emailData.subject} onChange={handleInputChange} />

      <label>Body:</label>
      <textarea name="body" value={emailData.body} onChange={handleInputChange} />

      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};

export default MyComponent;
