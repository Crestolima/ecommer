import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Custom CSS for styling (you can add your styles here)

const NotFound = () => {
  return (
    <div className="not-found d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="not-found-content text-center">
        <h1 className="display-1 text-primary">404</h1>
        <h3 className="text-muted">Oops! Page Not Found</h3>
        <p className="lead text-dark">
          The page you're looking for doesn't exist. You can go back to the{' '}
          <Link to="/" className="btn btn-primary btn-lg">Home</Link> page.
        </p>
      </div>
      <div className="not-found-image">
        <img
          src="https://img.icons8.com/ios/452/404.png" // Example image (you can use your own)
          alt="404 Not Found"
          className="img-fluid"
          style={{ maxWidth: '300px' }}
        />
      </div>
    </div>
  );
};

export default NotFound;
