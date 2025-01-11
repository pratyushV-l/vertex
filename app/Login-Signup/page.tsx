"use client"

import React, { useState } from 'react';

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="Login-Signup-page">
      <h1 className="login-heading">Welcome to Vertex</h1>
      <form className="login-form">
        <h2 className="login-subheading">{isLogin ? 'Login' : 'Create Account'}</h2>
            <input type="text" placeholder="Username" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
            <div className="social-login-buttons">
                <button type="button" className="login-Google">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                    <path fill="#4285F4" d="M24 9.5c3.9 0 6.6 1.6 8.1 2.9l6-6C34.7 3.5 29.8 1 24 1 14.8 1 7.1 6.7 3.9 14.5l7.1 5.5C12.8 14.1 17.9 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.3-4.1H24v8.1h12.7c-.5 2.7-2 5-4.2 6.5l6.5 5.1c3.8-3.5 6-8.7 6-15.6z"/>
                    <path fill="#FBBC05" d="M10.9 28.5c-1.1-3.2-1.1-6.8 0-10l-7.1-5.5C1.1 16.1 0 20 0 24s1.1 7.9 3.8 11l7.1-5.5z"/>
                    <path fill="#EA4335" d="M24 48c6.5 0 11.9-2.1 15.8-5.7l-6.5-5.1c-2.1 1.5-4.8 2.4-7.7 2.4-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.1 41.3 14.8 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                </button>
                <button type="button" className="login-GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.385-1.332-1.755-1.332-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.805 1.305 3.49.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.235-3.22-.125-.305-.535-1.54.115-3.205 0 0 1.005-.32 3.3 1.23.955-.265 1.98-.4 3-.405 1.02.005 2.045.14 3 .405 2.28-1.55 3.285-1.23 3.285-1.23.655 1.665.245 2.9.12 3.205.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.815 1.1.815 2.22 0 1.605-.015 2.895-.015 3.285 0 .32.215.695.825.575C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                </button>
            </div>
            <button type="submit" className="login-button">{isLogin ? 'Continue' : 'Continue'}</button>
            <button type="button" className="create-account" onClick={toggleMode}>
                {isLogin ? "Don't have an Account? Create One" : 'Already have an Account? Login'}
            </button>
        </form>
          <img src="/favicon.ico" alt="Favicon" className="favicon-image" />
      </div>
  );
}