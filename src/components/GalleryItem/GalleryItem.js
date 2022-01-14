import React from "react";
import { Item, Image } from "./GalleryItem.styled";
import PropTypes from "prop-types";

const GalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <Item onClick={() => onClick(largeImageURL)}>
      <Image src={webformatURL} alt="" />
    </Item>
  );
};
export default GalleryItem;

GalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};
