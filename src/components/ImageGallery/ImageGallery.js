import React from "react";
import { List } from "./ImageGallery.styled";
import GalleryItem from "../GalleryItem/GalleryItem";

const ImageGallery = ({ pictures, onClick }) => {
  /* const [pictures, setPictures] = useState(null);
   const [allLoaded, setAllLoaded] = useState(false);
   const [error, setError] = useState(null);
   const [status, setStatus] = useState('idle');*/

  return (
    <>
      <List>
        {pictures.map(({ webformatURL, largeImageURL }, index) => (
          <GalleryItem
            key={index}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
          />
        ))}
      </List>
    </>
  );
};

export default ImageGallery;
