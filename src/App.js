import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/tabs/Home";
import Login from "./components/tabs/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="*" element={<>404 not found</>} />
    </Routes>
  );
}
