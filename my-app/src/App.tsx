import React from 'react';
import './App.css';
import{Map} from './map'
import { NetworkStationType, getClosestLocations } from './util';
import { List } from './bikeLocationList'

interface AppState {
  currentLocation: {latitude :number, longitude: number},
  closestStations: NetworkStationType[]
  minBikes: number
}

export default class App extends React.Component <{}, AppState>{

  state = {
    currentLocation: {latitude: 51.509865, longitude:-0.118092},
    closestStations: [],
    minBikes: 1
  }

  render() {

    return (
      <div className="BikeLocator">
        <form className='BikeLocator-locationInput' onSubmit={(event) => this.handleSubmit(event)}>
            <label className='locationLabel latitudeLabel'>
              Latitude:
              <input className="locationInput latitudeInput" type="text" name="latitude" />
            </label>
            <label className='locationLabel longitudeLabel'>
              Longitude:
              <input className="locationInput longitudeInput" type="text" name="longitude" />
            </label>
            <label className='locationLabel freeBikesLabel'>
              Number of bikes required: 
              <input className="locationInput freeBikesInput" type='number' name="freeBikes" defaultValue={1} />
            </label>
            <input className='locationSubmit' type="submit" value="Submit" />
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
    const minBikes: number = parseInt(event.target[2].value)

    this.setState({
      currentLocation: {latitude, longitude},
      minBikes: minBikes
    }, () => this.setClosestStations());

  }
  
  async setClosestStations() {
    
    await getClosestLocations(this.state.currentLocation, this.state.minBikes)
    .then((closestStationsResult) => {
      this.setState({
      closestStations: closestStationsResult
    })});
  }
}
