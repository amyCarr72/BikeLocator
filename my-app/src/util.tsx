// export async function apiCall(): Promise<BikeNetworkType>{
//     return new Promise(function(resolve, reject) { 
//         $.ajax({
//             url: 'http://api.citybik.es/v2/networks/santander-cycles',
//             type: 'GET',
//             success: function (data) {
//                 resolve(data);
//             },
//             error: function (error) {
//                 reject(error);
//             }
//         })
//     })
// }

export function apiCall() {
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
    installDate: number,
    installed: boolean,
    locked: boolean,
    name: string,
    removalDate: string,
    temporary: boolean,
    terminalName: string,
    uid: number
}