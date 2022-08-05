import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/tabs/Home";
import Login from "./components/tabs/Login";
import Error from "./components/tabs/Error";

export class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </div>
    );
  }
}

export default App;
