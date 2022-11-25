import * as L from 'leaflet';

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

export async function getClosestLocations(currentLocation: {latitude: number, longitude: number}, minBikeNum: number) {
    const {latitude, longitude} = currentLocation;
    var apiResult: BikeNetworkType | null = null;
    try{
        apiResult = await apiCall();

    } catch(e){
        console.log(e);

    } finally{
        if (!apiResult) return;
    }

    const stations = apiResult.stations.filter(function(station) { return station.free_bikes > minBikeNum});

    var fromLatLng = L.latLng(latitude, longitude);
    var distances: { index: number, distance: number }[] = [];

    // eslint-disable-next-line
    stations.forEach((station) => {

        var toLatLng = L.latLng(station.latitude, station.longitude);
        distances.push({ index: stations.indexOf(station) ?? 0, distance: fromLatLng.distanceTo(toLatLng)/ 1000});
    });
    
    
    distances.sort((a, b) => {
        let dist1 = a.distance;
        let dist2 = b.distance;

        return dist1 < dist2 ? -1 : (dist1 > dist2 ? 1 : 0)
    });

    var closestStations: any = [];

    for(let i=0; i < 5; i++){
        closestStations.push(stations[distances[i].index]);
    }

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