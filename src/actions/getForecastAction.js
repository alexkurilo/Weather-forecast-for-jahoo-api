export const asyncGetForecast = (id, city) => dispatch => {
    function forecastPromise(){
        return new Promise( function (resolve,reject){
            let inq = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "') and u='c'";
            let inquiry = new XMLHttpRequest();
            inquiry.open ('GET', "https://query.yahooapis.com/v1/public/yql?" + "q=" + encodeURIComponent(inq) + "&format=json", true);
            inquiry.onreadystatechange = function(){
                if (inquiry.readyState !== 4){
                    return;
                }
                if (inquiry.status === 200){
                    let forecast = JSON.parse(inquiry.responseText);
                    //console.log(forecast.query.results.channel.item.condition.code);
                    console.log(forecast);
                    forecast = forecast.query.results.channel;
                    //console.log(id);
                    let display = 'none';
                    let nonDisplay = "inline";
                    resolve ({id, forecast, display, nonDisplay});
                }else{
                    alert('shit happens: ' +  inquiry.status + ', ' + inquiry.statusText );
                }
            };
            inquiry.onerror = function(error){
                reject(error);
            };
            inquiry.send()
        });
    }

    forecastPromise()
        .then(result => {
            dispatch ({ type: "FETCH_FORECAST", payload: result });
            return result;
        })
}