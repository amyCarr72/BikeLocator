import * as React from 'react';
import './bikeLocationList.css'
import { NetworkStationType } from './util';

export interface ListProps {
    closestStations: NetworkStationType[]
    currentLocation: {latitude: number, longitude: number}
}

export class List extends React.Component<ListProps>{
    
    render() {

        return (
            <div className='BikeLocator-stationsList'>
                <div className='BikeLocator-listHeader'>Closest Stations: </div>
                {this.drawListItems()}
            </div>
        )
    }

    drawListItems(){
        const{closestStations} = this.props;

        return closestStations.map((station, i) => {
            return (
                <React.Fragment key={i}>
                    <div className='BikeLocator-stationListItem'>
                        <span><b>{station.extra.name}</b> <br />
                            Bikes available: {station.free_bikes}
                        </span>
                    </div>
                </React.Fragment>
            )
        })
    }
}