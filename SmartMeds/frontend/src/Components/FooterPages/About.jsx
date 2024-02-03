import React from 'react';

const Privacy = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="custom-button" style={styles.button} onClick={handleGoBack}>
        Go Back
      </div>

      <div className="card mt-3 mb-5" style={styles.container}>
        <h1 style={styles.heading}>About Us</h1>
        <div style={styles.content}>
          <p>Welcome to Foodiko!</p>
          <p>We are a food ordering recommendation website dedicated to helping you discover and enjoy the best culinary experiences. Our goal is to make your food ordering process convenient, efficient, and enjoyable.</p>
          <p>At Foodiko, we understand that choosing what to eat can sometimes be overwhelming with numerous options available. That's why we leverage advanced algorithms and user preferences to provide personalized food recommendations tailored to your taste buds.</p>
          <p>Our team of food enthusiasts and experts works tirelessly to curate a diverse selection of restaurants and cuisines. Whether you're craving comfort food, exploring new flavors, or seeking healthy options, we've got you covered.</p>
          <p>With our user-friendly platform, you can easily browse through menus, read reviews, and place orders seamlessly. We strive to ensure a seamless experience from start to finish, so you can focus on indulging in your favorite dishes.</p>
          <p>Your privacy and security are our top priorities. We adhere to strict privacy practices and protect your personal information. You can learn more about our privacy policy <a href="/privacy">here</a>.</p>
          <p>We love hearing from our users and value your feedback. If you have any questions, suggestions, or concerns, please don't hesitate to reach out to our friendly customer support team.</p>
          <p>Thank you for choosing Foodiko. Get ready to embark on a delightful culinary journey!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'floralwhite',
  },
  heading: {
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  content: {
    fontSize: '16px',
  },
  button: {
    width: 'fit-content',
    height: 'fit-content',
    marginTop: '20px',
    marginLeft: '30px',
    padding: '10px 20px',
  },
};

export default Privacy;
