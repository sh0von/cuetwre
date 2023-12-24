import React, { useState } from "react";
import md5 from "js-md5";
import Cookies from "js-cookie";
import { Card, Form, Button, Modal } from "react-bootstrap";

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

    // Log the expected hash to check if it's read correctly
    console.log("Expected Hash:", process.env.REACT_APP_PASSWORD_HASH);

    // Retrieve the password hash from the environment variable
    const expectedHashedPassword = process.env.REACT_APP_PASSWORD_HASH;

    if (hashedPassword === expectedHashedPassword) {
      // Save a session token in local storage
      const currentTime = new Date().getTime();
      const oneHourLater = currentTime + 3600000; // 1 hour in milliseconds
      const sessionToken = oneHourLater.toString();
      localStorage.setItem("sessionToken", sessionToken);

      // Set a session cookie with the name "sessionToken"
      Cookies.set("sessionToken", sessionToken, { expires: 1 / 24 }); // Expires in 1 hour

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
      <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
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
