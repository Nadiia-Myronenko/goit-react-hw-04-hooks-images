import { useState, useEffect } from "react";

import { Wrapper, Message, ButtonWrapper } from "./App.styled";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsApiService from "./services/api";
import { Button } from "./components/Button/Button.styled";

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [largeImgSrc, setLargeImgSrc] = useState("");

  const handleFormSubmit = (keyWord) => {
    setKeyWord(keyWord);
  };
  const onMoreClick = () => {
    setPage((state) => state + 1);
  };
  const resetStates = () => {
    setPage(1);
    setPictures([]);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onImgClick = (largeImageURL) => {
    console.log("click");

    toggleModal();

    setLargeImgSrc(largeImageURL);
  };
  useEffect(() => {
    const newsApiService = new NewsApiService();
    if (keyWord === "") {
      return;
    }

    resetStates();
    newsApiService.query = keyWord;
    newsApiService.page = page;
    console.log(newsApiService.page);
    newsApiService
      .fetchArticles()
      .then((data) => {
        if (data.total) {
          setPictures((state) => [...state, ...data.hits]);
        } else {
          throw new Error("No images found for this request!");
        }
      })
      .catch((error) => setError(error));
  }, [keyWord, page]);

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery pictures={pictures} onClick={onImgClick} />
      <ButtonWrapper>
        <Button type="button" onClick={onMoreClick}>
          Load more...
        </Button>
      </ButtonWrapper>

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImgSrc} alt="" width="100%" height="100%" />
          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
    </Wrapper>
  );

  /*
  const [keyWord, setKeyWord] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [largeImgSrc, setLargeImgSrc] = useState("");
  const [pictures, setPictures] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
 
  const handleFormSubmit = (keyWord) => {
    setKeyWord(keyWord);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onImgClick = (largeImageURL) => {
    toggleModal();
    setLargeImgSrc(largeImageURL);
  };
  const newsApiService = new NewsApiService();
 
  useEffect(() => {
    if (keyWord === "") {
      return;
    }
    setStatus("pending");
    setAllLoaded(false);
    newsApiService.resetPage();
    newsApiService.query = keyWord;
    console.log("ключевое слово:", newsApiService.query);
    newsApiService
      .fetchArticles()
      .then((data) => {
        if (data.total) {
          setPictures(data.hits);
          console.log("Пришли данные", data.hits);
          setStatus("resolved");
          console.log("state Pictures:", pictures);
          if (data.total === pictures.length) {
            setAllLoaded(true);
          }
        } else {
          setAllLoaded(true);
          throw new Error("No images found for this request!");
        }
      })
      .catch((error) => { setError(error); setStatus("rejected") });
  }, [keyWord]);
 
 
  const onLoadMoreClick = () => {
    if (!allLoaded) {
      newsApiService
        .fetchArticles()
        .then((data) => {
          if (data.total === pictures.length) {
            setAllLoaded(true);
          }
          setPictures((state) => (
            [...state, ...data.hits]
          ));
        })
        .catch((error) => { setError(error); setStatus("rejected") });
    }
  };
 
  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
 
      {(status === "idle") &&
        <Message>Enter key word for image search!</Message>}
      {(status === "pending") &&
        <Loader />}
      {(status === "resolved") &&
        <ImageGallery pictures={pictures} onClick={onImgClick} />}
      {(status === "rejected") &&
        <Message>{error.message}</Message>}
 
      {!allLoaded && (
        <ButtonWrapper>
          <Button type="button" onClick={onLoadMoreClick}>
            Load more...
          </Button>
        </ButtonWrapper>
      )}
 
      {showModal && (
        <Modal onClose={toggleModal}>
          <img
            src={largeImgSrc}
            alt=""
            width="100%"
            height="100%"
          />
          <button onClick={toggleModal}>Close Modal</button>
        </Modal>
      )}
 
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Wrapper>
  );*/
};

export default App;
