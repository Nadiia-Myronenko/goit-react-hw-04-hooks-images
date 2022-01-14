import { Component } from "react";

import { HiOutlineSearch } from "react-icons/hi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SearchBar,
  SearchForm,
  SearchButton,
  SearchFormInput,
} from "./Searchbar.styled";

class Searchbar extends Component {
  state = {
    keyWord: "",
  };
  handleKeywordChange = (event) => {
    this.setState({ keyWord: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.keyWord.trim() === "") {
      toast.warn(" Enter something!");
      return;
    }
    this.props.onSubmit(this.state.keyWord);
    this.setState({ keyWord: "" });
  };
  render() {
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <HiOutlineSearch style={{ height: "2em", width: "2em" }} />
          </SearchButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            name="keyWord"
            placeholder="Search images and photos"
            value={this.state.keyWord}
            onChange={this.handleKeywordChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
export default Searchbar;
