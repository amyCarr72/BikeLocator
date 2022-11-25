import React from 'react';
import './App.css';
import{Map} from './map'
import { NetworkStationType, getClosestLocations } from './util';
import { List } from './bikeLocationList'
import { LocationInput } from './inputForm';

interface AppState {
  currentLocation: {latitude :number, longitude: number},
  closestStations: NetworkStationType[]
}

export default class App extends React.Component <{}, AppState>{

  state = {
    currentLocation: {latitude: 51.509865, longitude:-0.118092},
    closestStations: []

  }

  render() {

    return (
      <div className="BikeLocator">
        <form className='BikeLocator-locationInput' onSubmit={(event) => this.handleSubmit(event)}>
            <label>
              Latitude:
              <input type="text" name="latitude" />
            </label>
            <label>
              Longitude:
              <input type="text" name="longitude" />
            </label>
            <input type="submit" value="Submit" />
        </form>

        <div className='BikeLocator-mapListContainer'>
          <Map closestList={this.state.closestStations} currentLocation={this.state.currentLocation}/>
          <List closestStations={this.state.closestStations} currentLocation={this.state.currentLocation}/>
        </div>
      </div>
    );
  }

  handleSubmit(event: any){
    event.preventDefault();

    const latitude: number = parseFloat(event.target[0].value);
    const longitude: number = parseFloat(event.target[1].value);

    this.setState({
      currentLocation: {latitude, longitude}
    }, () => this.setClosestStations());

  }
  
  async setClosestStations() {
    
    await getClosestLocations(this.state.currentLocation)
    .then((closestStationsResult) => {
      this.setState({
      closestStations: closestStationsResult
    })});

  }

  
}
