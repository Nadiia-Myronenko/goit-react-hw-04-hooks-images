import React from "react";
import { Component } from "react";

import { List, Message, ButtonWrapper } from "./ImageGallery.styled";
import GalleryItem from "../GalleryItem/GalleryItem";
import Loader from "../Loader/Loader";
import { Button } from "../Button/Button.styled";
import NewsApiService from "../../services/api";

class ImageGallery extends Component {
  state = {
    pictures: null,
    allLoaded: false,
    error: null,
    status: "idle",
  };
  newsApiService = new NewsApiService();

  componentDidUpdate(prevProps, prevState) {
    this.newsApiService.query = this.props.keyWord;
    if (prevProps.keyWord !== this.props.keyWord) {
      this.setState({ status: "pending", allLoaded: false });
      this.newsApiService.resetPage();
      this.newsApiService.query = this.props.keyWord;
      this.newsApiService
        .fetchArticles()
        .then((data) => {
          if (data.total) {
            this.setState({ pictures: data.hits, status: "resolved" });
            if (data.total === this.state.pictures.length) {
              this.setState({ allLoaded: true });
            }
          } else {
            this.setState({ allLoaded: true });
            throw new Error("No images found for this request!");
          }
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  onLoadMoreClick = () => {
    if (!this.state.allLoaded) {
      this.newsApiService
        .fetchArticles()
        .then((data) => {
          if (data.total === this.state.pictures.length) {
            this.setState({ allLoaded: true });
          }
          this.setState((prevState) => ({
            pictures: [...prevState.pictures, ...data.hits],
          }));
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  };
  render() {
    const { pictures, error, status } = this.state;
    if (status === "idle") {
      return <Message>Enter key word for image search!</Message>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <>
          <List>
            {pictures.map(({ webformatURL, largeImageURL }, index) => (
              <GalleryItem
                key={index}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onClick={this.props.onClick}
              />
            ))}
          </List>
          {!this.state.allLoaded && (
            <ButtonWrapper>
              <Button type="button" onClick={this.onLoadMoreClick}>
                Load more...
              </Button>
            </ButtonWrapper>
          )}
        </>
      );
    }
    if (status === "rejected") {
      return <Message>{error.message}</Message>;
    }
  }
}
export default ImageGallery;
