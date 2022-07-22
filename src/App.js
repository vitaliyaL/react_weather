import React, { Component } from "react";
import Data from "./components/Data/Data";
import "./App.css";
import Header from "./components/Header/Header";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styled-components/GlobalStyles";
import { darkTheme, lightTheme } from "./styled-components/Theme";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ContrastIcon from "@mui/icons-material/Contrast";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Могилёв",
      isChange: "light",
    };
  }
  getValinApp = (i) => {
    this.setState({ value: i });
  };
  setColor = (color) => {
    localStorage.setItem("color", color);
  };
  themeToggle = () => {
    if (this.state.isChange === "dark" ) {
      this.setColor("light");
    } else {
      this.setColor("dark");
    }
    this.setState({ isChange: localStorage.getItem("color") });
    localStorage.getItem("color");
  };
  componentDidMount() {
    this.setState({ isChange: localStorage.getItem("color") });
  }

  render() {
    const theme = this.state.isChange !== "dark" ? lightTheme : darkTheme;
    return (
      <div className='weather'>
        {/* <ContrastIcon
          onClick={this.themeToggle}
          className='change_theme'
        /> */}
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header getValinApp={this.getValinApp} themeToggle={this.themeToggle}/>
          <Data value={this.state.value} />
        </ThemeProvider>
      </div>
    );
  }
}
