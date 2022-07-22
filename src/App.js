import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/tabs/Home";
import Login from "./components/tabs/Login";

export class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<>404 not found</>} />
        </Routes>
      </div>
    );
  }
}

export default App;
