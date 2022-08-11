import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/tabs/Home";
import Login from "./components/tabs/Login";
import Error from "./components/tabs/Error";


<<<<<<< HEAD
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
=======
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<>404 not found</>} />
    </Routes>
  );
>>>>>>> 2c0118a4d258f32e0a871655d0443b38b99ba682
}
