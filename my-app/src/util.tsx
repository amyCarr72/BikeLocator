
export function apiCall(){
    $.ajax({
        url: 'http://api.citybik.es/v2/networks/santander-cycles',
        type: 'GET',
        success: function (data) {
            console.log('data: ', data);
            return data;
        },
        error: function (error) {
            console.log(`Error ${error}`);
        }
    })
}