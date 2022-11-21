import React from 'react';
import { apiCall } from './util';

export class Map extends React.Component{
    render(): React.ReactNode {

        this.sortData();


        return (
        <div className="Map-main">Here is the map
        </div>
        )
    }

    sortData() {
        const rawData = apiCall();
        console.log(rawData);
    }
}