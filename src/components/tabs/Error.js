import React, { Component } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/lotties/404.json";



export class Error extends Component {
  render() {
    
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
      <div >
        <Lottie 
        options={defaultOptions} 
        height={400} 
        width={400} />
         <span style={{ marginLeft: "45%" }} >Page not found</span>
      </div>
    );
  }
}

export default Error;
