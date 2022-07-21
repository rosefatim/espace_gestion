import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

export class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
