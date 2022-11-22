
export async function apiCall(){
    return new Promise(function(resolve, reject) { 
        $.ajax({
            url: 'http://api.citybik.es/v2/networks/santander-cycles',
            type: 'GET',
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        })
    })
}