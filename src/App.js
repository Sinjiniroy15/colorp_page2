import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const color = ['red', 'yellow', 'green', 'blue'];
  
  

  const [currentColor, setCurrentColor] = useState(0);
  const handleClicked = (index) => {
      setCurrentColor(index)
  }
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

    // Function to send color change to WebSocket server
    const sendColorChange = (selectedColor) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'colorChange', color: selectedColor }));
      }
    };

    socket.onopen = () => {
      console.log('WebSocket connected');
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'colorChange') {
        const receivedColor = data.color;
        // Update the color based on the received color
        const index = color.indexOf(receivedColor);
        if (index !== -1) {
          setCurrentColor(index);
        }
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, []);
  return (
    <div className="App">
      <h1>Side 2</h1>
      <div className="Btgrp">
        <div className="Bt bt1" onClick={() => handleClicked(0)}></div>
        <div className="Bt bt2" onClick={() => handleClicked(1)}></div>
        <div className="Bt bt3" onClick={() => handleClicked(2)}></div>
        <div className="Bt bt4" onClick={() => handleClicked(3)}></div>
      </div>

      <div className="main-box" style={{ backgroundColor: color[currentColor] }}>

      </div>
    </div>
  );
}

export default App;
