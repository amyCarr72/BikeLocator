import * as React from 'react';
import { NetworkStationType } from './util';

export interface ListProps {
    closestStations: NetworkStationType[]
    currentLocation: {latitude: number, longitude: number}
}

export class List extends React.Component<ListProps>{
    
    render() {
        const {closestStations, currentLocation} = this.props;
        const {latitude, longitude} = currentLocation;

        // const closeStat = this.getClosestLocations(currentLocation);

        return (
            <div>This is the list</div>
        )
    }
}