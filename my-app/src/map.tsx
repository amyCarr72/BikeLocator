import React from 'react';
import { resourceLimits } from 'worker_threads';
import { apiCall } from './util';

export class Map extends React.Component{
    render(): React.ReactNode {

        this.sortData();


        return (
        <div className="Map-main">Here is the map
        </div>
        )
    }

    async sortData() {
        try{
            const result = await apiCall();
            return result;
        } catch(e){
            console.log(e);
        }
    }
}