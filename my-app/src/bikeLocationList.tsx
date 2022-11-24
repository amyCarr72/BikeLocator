import * as React from 'react';
import { apiCall, NetworkStationType } from './util';

export interface ListProps {
    closestStations: NetworkStationType[]
    currentLocation: {latitude: number, longitude: number}
}

export class List extends React.Component<ListProps>{
    render() {
        return (
            <div>This is the list</div>
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