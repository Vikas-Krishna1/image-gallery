//Impoorts
import Header from "./componets/header";
import React from "react";
import Search from "./componets/search";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "./componets/imageCard";
import { Container, Row, Col } from "react-bootstrap";
import Welcome from "./componets/welcome";
import LoadingSpinner from "./componets/spinner";

//_______________________________________________________________________________________________________


//Sets the API URL to the Frontend usage
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5050";
//Main App Component for setting up the state and functions for the application, as well as rendering the components and handling user interactions such as searching for images, saving images, and deleting images.
function App() {
  const [word, setWord] = useState("");//Sate of Query word for searching for images
  const [images, setImages] = useState([]);//Sstate of given images per USer 
  const [loading, setLoading] = useState(true);//State of loading for the application

 

  
//Function for pulling Saved Images from the database and setting the state of images 
// to the response data, as well as handling any errors that may occur during the request and 
// displaying appropriate toast notifications to the user.
  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoading(false);
      toast.success("Images loaded successfully");
    } catch (error) {
      //Error Handles for if there is an error loading the images from the database
      toast.error("Error loading images");
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);
//Function for handling the Search'/ Query submission for searching for new images based on the query word
// and setting the state of images to the response data,
//  as well as handling any errors that may occur during the request and displaying appropriate 
// toast notifications to the user.
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // axios call to get the new image based on the query word
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New Image ${word.toUpperCase()} found successfully`);
    } catch (error) {
      //Error Handles for if there is an error fetching the new image
      toast.error("Error fetching new image");
      console.log(error);
    }

    setWord("");
  };
//Function for hnadling button click for saving an image to the database based on its id, 
// and setting the state of images to include the new saved image, as well as 
// handling any errors that may occur during the request and 
// displaying appropriate toast notifications to the user.
  const handleSaveClick = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;
    try {
      // axios call to save the image to the database
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image //-> Updates the state of images to include the new saved image by mapping through the existing 
          )
        );
        toast.info(`Image ${imageToBeSaved.title} saved successfully`);
      }
    } catch (error) {
      //Error Handles for if there is an error saving the image to the database
      toast.error("Error saving image");
      console.log(error);
    }
  };
//Function for hamdling the Delete button click for deleting an image from the database based on its id,
//  and setting the state of images to exclude the deleted image, as well
//  as handling any errors that may occur during the request and displaying 
// appropriate toast notifications to the user.
  const handleDeleteClick = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
        toast.error(`Image deleted successfully`);
      }
    } catch (error) {
      //Error Handling for if there is an error deleting the image from the database such as: 
      //if the image is not found in the database
      toast.error("Error deleting image");
      console.log(error);
    }
  };

  return (
    <div>

      <>
        <Header title="Image Gallery" />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <Search
              word={word}
              setWord={setWord}
              handleSubmit={handleSearchSubmit}
            />

            <Container className="mt-4">
              {images.length > 0 ? (
                <Row xs={1} md={2} lg={3}>
                  {images.map((image, i) => (
                    <Col key={i} className="pb-5">
                      <ImageCard
                        image={image}
                        saveClick={handleSaveClick}
                        deleteClick={handleDeleteClick}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Welcome />
              )}
            </Container>
          </>
        )}
      </>
      <ToastContainer
        position="bottom-right"

         />
          
    </div>
   
  );
}

export default App;

