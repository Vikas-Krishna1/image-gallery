import React from "react";
import { Container, Button, Stack } from "react-bootstrap";
//Welcone Component for rendering the welcome page of the
//  application with a title, description, and buttons for starting 
// the search and learning more about the application.
const Welcome = () => {
  return (
    <Container className="py-5">
      <div className="p-5 mb-4 bg-light rounded-3 text-center">
        <h1 className="display-5 fw-bold">Image Gallery</h1>

        <p className="fs-5 text-muted">
          Search and explore beautiful images from Unsplash.
        </p>

        <Stack
          direction="horizontal"
          gap={3}
          className="justify-content-center mt-4"
        >
          <Button variant="primary" size="lg">
            Start Searching
          </Button>

          <Button
            variant="outline-dark"
            size="lg"
            href="https://github.com/Vikas-Krishna1/image-gallery"//Link to Github Repo
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </Button>
        </Stack>
      </div>
    </Container>
  );
};

export default Welcome;
