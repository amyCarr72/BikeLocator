import React from 'react';
import logo from './logo.svg';
import './App.css';
import { apiCall } from './util';
import {Map} from './map';

function App() {
  return (
    <div className="BikeLocator">
      <header className="BikeLocator-header">
        This is the header
      </header>
      <Map />
    </div>
  );
}

export default App;
