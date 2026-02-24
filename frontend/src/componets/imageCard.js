import React from "react";
import { Card, Button } from "react-bootstrap";

//ImageCard Component for rendering individual image cards
//  with the image, title, description, and buttons 
// : for saving and deleting the image.
const ImageCard = ({ image, deleteClick, saveClick }) => {
  const imageUrl = image?.urls?.small || "/placeholder.png"; // fallback
  const title = image?.title?.toUpperCase() || "Untitled";// fallback
  const description =
    image?.description || image?.alt_description || "No description";// fallback

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>

        {!image.saved && (
          <Button variant="secondary" onClick={() => saveClick(image.id)}>
            Save
          </Button>
        )}
        {"  "}
        <Button variant="primary" onClick={() => deleteClick(image.id)}> 
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
