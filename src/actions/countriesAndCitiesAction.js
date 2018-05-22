export const asyncGetCountriesAndCities = () => dispatch => {
    function countriesAndCitiesPromise(url){
        return new Promise( function (resolve,reject){
            let request = new XMLHttpRequest();
            request.open('GET', 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json', true);
            request.onreadystatechange = function(){
                if (request.readyState !== 4){
                return;
                }
                if (request.status === 200){
                    let result = JSON.parse(request.responseText);
                    //console.log(result); 
                    resolve (result);
                }
                else {
                    alert('shit happens: ' +  request.status + request.statusText );
                    reject (request.statusText);
                }
            };
            request.onerror = function(error){
                reject(error);
            };
            request.send();
        });     
    }

    countriesAndCitiesPromise()
        .then(result => {
            dispatch ({ type: "FETCH_COUNTRIES_AND_CITIES", payload: result });
            return result;
        })
        .then(result =>{
            let countries = [];
            for (let key in result) {
                if (key){
                    countries.push(key);
                }
            }
            let countriesSort = countries.sort();
            dispatch ({ type: "FETCH_COUNTRIES", payload: countriesSort });
            return countriesSort;
        })
}
        /*let countriesSortAndId = [];
        for (let i = 0; i <= countriesSort.length - 1; i++) {
            let id = i;
            let name = countriesSort[i];
            countriesSortAndId.push({id, name});
        }*/
        //console.log(countriesSortAndId);
