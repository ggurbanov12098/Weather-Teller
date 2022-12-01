fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=50697639d130e6a0f1a08e4c6825c5f0')
    .then(function(resp){return resp.json()}) // converting data to json
    .then(function(data){
        console.log(data);
    })
    .catch(function() {
        //catch any errors
    })