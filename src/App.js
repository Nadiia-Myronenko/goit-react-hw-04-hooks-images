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
  const [allLoaded, setAllLoaded] = useState(false);
  const [status, setStatus] = useState("idle");

  const handleFormSubmit = (keyWord) => {
    setKeyWord(keyWord);
    setPage(1);
    setPictures([]);
    setAllLoaded(false);
    setStatus("idle");
  };
  const onLoadMoreClick = () => {
    setPage((state) => state + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const onImgClick = (largeImageURL) => {
    toggleModal();
    setLargeImgSrc(largeImageURL);
  };

  useEffect(() => {
    if (keyWord === "") {
      setAllLoaded(true);
      return;
    }
    setStatus("pending");
    setAllLoaded(true);
    const newsApiService = new NewsApiService();
    newsApiService.query = keyWord;
    newsApiService.page = page;
    newsApiService
      .fetchArticles()
      .then((data) => {
        if (data.total) {
          setPictures((state) => [...state, ...data.hits]);
          setStatus("resolved");
          setAllLoaded(false);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
          if (data.total === pictures.length || data.hits.length < 12) {
            setAllLoaded(true);
          }
        } else {
          throw new Error("No images found for this request!");
        }
      })
      .catch((error) => {
        setAllLoaded(true);
        setError(error);
        setStatus("rejected");
      });
  }, [keyWord, page]);

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === "idle" && <Message>Enter key word for image search!</Message>}
      {status === "pending" && <Loader />}
      {status === "resolved" && (
        <ImageGallery pictures={pictures} onClick={onImgClick} />
      )}
      {status === "rejected" && <Message>{error.message}</Message>}

      {!allLoaded && (
        <ButtonWrapper>
          <Button type="button" onClick={onLoadMoreClick}>
            Load more...
          </Button>
        </ButtonWrapper>
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImgSrc} alt="" width="100%" height="100%" />
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
  );
};

export default App;
