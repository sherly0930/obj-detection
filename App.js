// import dependencies from React lib
import React, { useRef, useState, useEffect } from "react";
// install TensorFlow.js, enables the model coco-ssd to work
import * as tf from "@tensorflow/tfjs"; 
// import pre-trained obj detection model - coco ssd model 
import * as cocossd from "@tensorflow-models/coco-ssd";
// import a react component - webcam to access device's webcam
import Webcam from "react-webcam";
// import local CSS file with styling rules for component
import "./App.css";
// import drawing utility here
import {drawRect} from "./utilities";

// use core React lib to define component func App()
function App() {
  const webcamRef = useRef(null);  // useRef: reference elements for webcamRef & canvasRef
  const canvasRef = useRef(null);

  // main function
  const runCoco = async () => {
    // load network, load coco ssd model
    const net = await cocossd.load();
    
    //  loop & detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // make detections
      const obj = await net.detect(video);  // create variable object, video: vid from webcam
      console.log(obj);  // see output of the detection in a console

      // draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // update drawing utility
      drawRect(obj, ctx);
    }
  };

  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;


// install node.js v16.20.2 required to use React.js & Tensorflow.js , download .msi installer for windows
// add path
// no need to check the box “Install Build Tools”, The packages used in this specific project dont require native C/C++ compilation
// & all are pure JavaScript, and install cleanly with a standard Node.js + npm setup

// npm install -> npm start -> start the localhost
// detect obj (person, cell phone, bottle)