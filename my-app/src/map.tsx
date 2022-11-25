import React from 'react';
import './map.css';
import {observer} from 'mobx-react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { NetworkStationType } from './util';

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

        const {latitude, longitude} = this.props.currentLocation;

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
        const {closestList} = this.props;

        return closestList.map((location, i) => {
            // console.log('location: ', location.name);
            // console.log('i: ', i);
            return (
                <React.Fragment key={i}>
                    <Marker position={[location.latitude, location.longitude]}>
                        <Popup>
                            {location.name}
                        </Popup>
                    </Marker>
                </React.Fragment>
            )
        })
    }
}