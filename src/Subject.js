import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Breadcrumb, Row, Col } from 'react-bootstrap';
import PDFModal from './PDFModal'; // Import the PDFModal component

function Subject() {
  const { levelIndex, termIndex, subjectIndex } = useParams();
  const subject = data.levels[levelIndex].terms[termIndex].subjects[subjectIndex];

  // State for the PDF modal
  const [showModal, setShowModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState('');

  const handlePdfClick = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPdf('');
    setShowModal(false);
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/level/${levelIndex}`}>{data.levels[levelIndex].name}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/level/${levelIndex}/term/${termIndex}`}>{data.levels[levelIndex].terms[termIndex].name}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{subject.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        {subject.books.map((book, bookIndex) => (
          <Col key={bookIndex} md={6} className="mb-4">
            <div className="border container rounded p-4">
              <h4>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePdfClick(book.link); // Open PDF in modal on link click
                  }}
                >
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
      {/* Render PDFModal */}
      <PDFModal show={showModal} handleClose={handleCloseModal} pdfUrl={selectedPdf} />
    </Container>
  );
}

export default Subject;
