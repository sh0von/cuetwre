import React, { useState,useEffect } from "react";
import "./App.css";

import data from "./data.json";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Container, Breadcrumb, Button, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";

import PasswordForm from "./PasswordForm"; // Import the PasswordForm component

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the session token exists and is still valid (not expired)
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(sessionToken)) {
        setAuthenticated(true);
      } else {
        // Session has expired, remove the session token
        localStorage.removeItem("sessionToken");
      }
    }
  }, []);

  const handlePasswordSubmit = (isAuthenticated) => {
    setAuthenticated(isAuthenticated);
  };
  return (
    <Router>
      {authenticated ? ( // Only render the app content if authenticated
        <div>
      <div id="particle-container">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
      </div>
      <div className="background-image d-flex align-items-center justify-content-center min-vh-100">
        <Container>
          {" "}
          <Helmet>
            
          </Helmet>
          <h1 className="text-center mb-4">CUET WRE</h1>
          <h3 className="text-center mb-4">Water Resources Engineering</h3>
         <Row className="d-flex flex-column  ">
            <Col>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/level/:levelIndex" element={<Level />} />
                <Route
                  path="/level/:levelIndex/term/:termIndex"
                  element={<Term />}
                />
                <Route
                  path="/level/:levelIndex/term/:termIndex/subject/:subjectIndex"
                  element={<Subject />}
                />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>{" "}
      <footer className="mt-auto text-center py-3">
        <nav></nav> 
        <p>&copy; 2023 CUET WRE Students. All rights reserved.</p>
      </footer>
      </div>
      ) : (
        <div className="password-page">
          <PasswordForm onPasswordSubmit={handlePasswordSubmit} />
        </div>
      )}
    </Router>
  );
}

function Home() {
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        {data.levels.map((level, levelIndex) => (
          <Col key={levelIndex} md={6} className="mb-4">
            <div className="border ccontainer rounded p-4">
              <h4>{level.name}</h4>
              <Link to={`/level/${levelIndex}`}>
                <Button variant="primary" className="bg-primary border-0">
                  Explore
                </Button>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function Level() {
  const { levelIndex } = useParams();
  const level = data.levels[levelIndex];

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/level/${levelIndex}`}>{level.name}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        {level.terms.map((term, termIndex) => (
          <Col key={termIndex} md={6} className="mb-4">
            <div className="border ccontainer rounded p-4">
              <h4>{term.name}</h4>
              <Link to={`/level/${levelIndex}/term/${termIndex}`}>
                <Button variant="primary" className="mt-2">
                  Explore
                </Button>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function Term() {
  const { levelIndex, termIndex } = useParams();
  const term = data.levels[levelIndex].terms[termIndex];

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/level/${levelIndex}`}>
            {data.levels[levelIndex].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/level/${levelIndex}/term/${termIndex}`}>{term.name}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        {term.subjects.map((subject, subjectIndex) => (
          <Col key={subjectIndex} md={6} className="mb-4">
            <div className="border ccontainer rounded p-4">
              <h4>{subject.title}</h4>
              <p> {subject.books.length} Materials</p>
              {}

              <Link
                to={`/level/${levelIndex}/term/${termIndex}/subject/${subjectIndex}`}
              >
                <Button variant="primary" className="mt-2">
                  Explore
                </Button>
              </Link>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function Subject() {
  const { levelIndex, termIndex, subjectIndex } = useParams();
  const subject =
    data.levels[levelIndex].terms[termIndex].subjects[subjectIndex];

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/level/${levelIndex}`}>
            {data.levels[levelIndex].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/level/${levelIndex}/term/${termIndex}`}>
            {data.levels[levelIndex].terms[termIndex].name}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{subject.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        {subject.books.map((book, bookIndex) => (
          <Col key={bookIndex} md={6} className="mb-4">
            <div className="border ccontainer rounded p-4">
              <h4>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  {book.name}
                </a>
              </h4>
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
