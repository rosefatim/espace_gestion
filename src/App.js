import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/tabs/Home";
import Login from "./components/tabs/Login";
import Error from "./components/tabs/Error";
import Todo from "./components/tabs/Todo";
import Test from "./components/tabs/test";
import Register from "./components/tabs/Register";
// import Home from "./components/tabs/Save";




export class App extends Component {
  render() {
    return (
      <div>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="todo" element={<Todo/>} />
          <Route path="register" element={<Register/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </div>
    );
}
}
export default App
