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
            <div className='BikeLocator-stationsList'>
                <div className='BikeLocator-listHeader'>Closest Stations: </div>
                <ul>
                    {this.drawListItems()}
                </ul>
            </div>
        )
    }

    drawListItems(){
        const{closestStations} = this.props;

        return closestStations.map((station, i) => {
            return (
                <React.Fragment key={i}>
                    <div className='BikeLocator-stationListItem'>
                        <li><b>{station.extra.name}</b> <br />
                            Bikes available: {station.free_bikes}
                        </li>
                    </div>
                </React.Fragment>
            )
        })
    }
}