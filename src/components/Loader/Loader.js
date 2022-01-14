import React from "react";

import Spinner from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SpinnerWrapper } from "./Loader.styled";

const Loader = () => {
  return (
    <SpinnerWrapper>
      <Spinner
        type="Oval"
        color="blue"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </SpinnerWrapper>
  );
};
export default Loader;
