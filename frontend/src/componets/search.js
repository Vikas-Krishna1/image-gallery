import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Search = ({ word, setWord, handleSubmit }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={4}>
          <Form onSubmit={handleSubmit}> 
            <Row>
              <Col xs={9}>
                <Form.Control
                  onChange={(e) => setWord(e.target.value)}
                  value={word}
                  type="text"
                  placeholder="Search for new images..."
                />
              </Col>
              <Col>
                <Button varriant="primary" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
