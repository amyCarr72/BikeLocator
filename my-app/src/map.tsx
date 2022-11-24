import React from 'react';
import './map.css';
import {observable, action } from 'mobx';
import {observer} from 'mobx-react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { apiCall, NetworkStationType } from './util';

interface MapProps {
    closestList: NetworkStationType[],
    currentLocation: {latitude: number, longitude: number}
}

interface MapState {
    latitude: number,
    longitude: number
}

@observer
export class Map extends React.Component<MapProps, MapState>{
    
    render(): React.ReactNode {

        // this.getClosestLocations(-0.084605692, 51.521283);
        const {latitude, longitude} = this.props.currentLocation;

        console.log('lat: ', latitude, " long: ", longitude);

        return (
            <div>
                <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            This is your current location. <br />
                            {latitude} {longitude}
                        </Popup>
                    </Marker>
                    {this.drawPopups()}
                </MapContainer>
          </div>
        )
    }

    drawPopups() {
        const {closestList, currentLocation} =this.props;
        const {latitude, longitude} = currentLocation

        return closestList.map((location, i) => {

            return (
            <React.Fragment key={i}>
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        This is your current location.
                    </Popup>
                </Marker>
            </React.Fragment>
            )
    })
    }

    async getClosestLocations(longitude: number, latitude: number) {
        var result;
        try{
            result = await apiCall();

        } catch(e){
            console.log(e);
        }

        // eslint-disable-next-line
        result?.stations.map((station) => {
            // console.log('station: ', station);

        })
        //return a list of the stations indexes
    }
}