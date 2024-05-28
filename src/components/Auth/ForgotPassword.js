import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    // Implementar recuperación de contraseña con Firebase
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Forgot Password</button>
    </div>
  );
};

export default ForgotPassword;
