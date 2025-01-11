import React from 'react';

export default function LoginSignupPage() {
  return (
    <div className="Login-Signup-page">
        <h1 className="login-heading">Welcome to Vertex</h1>
      <form className="login-form">
        <input type="text" placeholder="Username" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button type="submit" className="login-button">Login</button>
        <button type="submit" className="login-Google">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
            <path fill="#4285F4" d="M24 9.5c3.9 0 6.6 1.6 8.1 2.9l6-6C34.7 3.5 29.8 1 24 1 14.8 1 7.1 6.7 3.9 14.5l7.1 5.5C12.8 14.1 17.9 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.3-4.1H24v8.1h12.7c-.5 2.7-2 5-4.2 6.5l6.5 5.1c3.8-3.5 6-8.7 6-15.6z"/>
            <path fill="#FBBC05" d="M10.9 28.5c-1.1-3.2-1.1-6.8 0-10l-7.1-5.5C1.1 16.1 0 20 0 24s1.1 7.9 3.8 11l7.1-5.5z"/>
            <path fill="#EA4335" d="M24 48c6.5 0 11.9-2.1 15.8-5.7l-6.5-5.1c-2.1 1.5-4.8 2.4-7.7 2.4-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.1 41.3 14.8 48 24 48z"/>
            <path fill="none" d="M0 0h48v48H0z"/>
          </svg>
          Login with Google
        </button>
      </form>
    </div>
  );
}