import React from 'react';

export default function LoginSignupPage() {
  return (
    <div className="Login-Signup-page">
        <h1 className="login-heading">Welcome to Vertex</h1>
      <form className="login-form">
        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}