import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="BikeLocator">
      <header className="BikeLocator-header">
        <button className="BikeLocator-button" onClick={() => {console.log("clicked")}}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
