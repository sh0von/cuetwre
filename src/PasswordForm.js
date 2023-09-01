import React, { useState } from "react";
import md5 from "js-md5"; // Import the md5 library
import { Card, Form, Button, Modal } from "react-bootstrap"; // Import Bootstrap components

function PasswordForm({ onPasswordSubmit }) {
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = md5(password);
    console.log("Entered Hash:", hashedPassword);
  
    // Retrieve the password hash from environment variable
    const expectedHashedPassword = process.env.REACT_APP_PASSWORD_HASH;
   // console.log("Expected Hash:", expectedHashedPassword);
  
    if (hashedPassword === expectedHashedPassword) {
      // Save a session token with an expiry timestamp (1 hour from now)
      const currentTime = new Date().getTime();
      const oneHourLater = currentTime + 3600000; // 1 hour in milliseconds
      localStorage.setItem("sessionToken", oneHourLater.toString());
  
      onPasswordSubmit(true);
    } else {
      // Display the error modal
      setShowErrorModal(true);
    }
  };
  
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-3">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <Modal
        show={showErrorModal}
        onHide={handleCloseErrorModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-danger">
          Incorrect password. Please try again.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PasswordForm;
