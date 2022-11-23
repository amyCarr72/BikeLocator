import React from 'react';
import './map.css';
import * as leaflet from 'leaflet'

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { apiCall, NetworkStationType } from './util';

export class Map extends React.Component{
    render(): React.ReactNode {

        this.getClosestLocations(-0.084605692, 51.521283);


        return (
            <div id="map">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
          </div>
        )
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