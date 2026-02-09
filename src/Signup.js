// Example Sign-up component snippet
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from './firebase';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email
      await sendEmailVerification(userCredential.user);
      setError(null);
      setEmail(null);
      setPassword(null);
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error) {
      setError(1);
      let errMsg = error.message.split(':');
      setMessage(errMsg[1])
    }
  };

  return (
    <div className="form-group sign-up-div">
      <div className="account-box">
      {message && <div className={error ? "alert alert-danger alert-dismissible fade show" : "alert alert-success alert-dismissible fade show"} role="alert">
                    <strong>{message}</strong> 
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
              </div>}
        <input 
          className="form-control video-join-call-button"
          type="email"
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          className="form-control video-join-call-button"
          type="password"
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary btn-rounded join-button" onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;