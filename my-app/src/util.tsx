import * as L from 'leaflet';
import App from './App';

function apiCall() {
    return new Promise<BikeNetworkType> ((resolve, reject) => {
        $.ajax({
            url: 'http://api.citybik.es/v2/networks/santander-cycles',
            type: 'GET',
            success: function (data) {
                resolve(data.network);
            },
            error: function(error) {
                reject(error);
            }
        })
    })
}

export async function getClosestLocations(currentLocation: {latitude: number, longitude: number}) {
    const {latitude, longitude} = currentLocation;
    console.log('latitude: ', latitude);
    console.log('longitude: ', longitude);
    var result: BikeNetworkType | null = null;
    try{
        result = await apiCall();

    } catch(e){
        console.log(e);

    } finally{
        if (!result) return;
    }

    var fromLatLng = L.latLng(latitude, longitude);
    var distances: { index: number, distance: number }[] = [];

    // eslint-disable-next-line
    result.stations.forEach((station) => {

        var toLatLng = L.latLng(station.latitude, station.longitude);
        distances.push({ index: result?.stations.indexOf(station) ?? 0, distance: fromLatLng.distanceTo(toLatLng)/ 1000});
    });
    
    
    distances.sort((a, b) => {
        let dist1 = a.distance;
        let dist2 = b.distance;

        return dist1 < dist2 ? -1 : (dist1 > dist2 ? 1 : 0)
    });

    var closestStations: any = [];
    // distances.forEach((distance) => {
    //     closestStations.push(result?.stations[distance.index]);
    // });

    for(let i=0; i < 5; i++){
        closestStations.push(result?.stations[distances[i].index]);
    }

    console.log('closestStations: ', closestStations);

    return closestStations;
}

export interface BikeNetworkType {
    company: string[],
    href: string,
    id: string,
    location: NetworkLocationType,
    name: string,
    stations: NetworkStationType[],

}

export interface NetworkLocationType {
    city: string,
    country: string,
    latitude: number,
    longitude: number
}

export interface NetworkStationType {
    empty_slots: number,
    extra: StationExtraDetailsType,
    free_bikes: number,
    id: string,
    latitude: number,
    longitude: number,
    name: string,
    timestamp: string
}

interface StationExtraDetailsType {
    installDate: string,
    installed: boolean,
    locked: boolean,
    name: string,
    removalDate: string,
    temporary: boolean,
    terminalName: string,
    uid: number
}

// export class BikeLocationStore {

//     @observable
//     closestStations: NetworkStationType[];

//     @observable
//     currentLocation: {latitude: number, longitude: number};

//     @action
//     setClosestStations(closestStations: NetworkStationType[]){
//         this.closestStations = closestStations;
//     }

//     @action
//     setCurrentLocation(latitude: number, longitude: number){
//         this.currentLocation = {latitude, longitude};
//     }

//     constructor(){

//     }


//     apiCall() {
//         return new Promise<BikeNetworkType> ((resolve, reject) => {
//             $.ajax({
//                 url: 'http://api.citybik.es/v2/networks/santander-cycles',
//                 type: 'GET',
//                 success: function (data) {
//                     resolve(data.network);
//                 },
//                 error: function(error) {
//                     reject(error);
//                 }
//             })
//         })
//     }

//     async getClosestLocations(longitude: number, latitude: number) {
//         var result;
//         try{
//             result = await this.apiCall();

//         } catch(e){
//             console.log(e);
//         }

//         // eslint-disable-next-line
//         result?.stations.map((station) => {
//             console.log('station: ', station);

//         })
//         //return a list of the stations indexes
//     }

// }