let weather = {
    apiKey: "50697639d130e6a0f1a08e4c6825c5f0",
    // https:api.openweathermap.org/data/2.5/weather?lat=40&lon=50&units=metric&appid=50697639d130e6a0f1a08e4c6825c5f0;

    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    fetchCords: function(lat, lon){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.switchCordToCity(data));
    },

    fetchCountry: function(city){
        fetch("https://restcountries.com/v3.1/capital/" + city + "")
            .then((response) => response.json())
            .then((data) => this.displayCountry(data));
    },

    switchCordToCity: function(data){
        const { name } = data;
        city = name;
        this.fetchWeather(city);
    },

    displayCountry: function(data){
        const {status} = data;
        if(status == 404){
            document.querySelector(".flag-icon").remove();
            document.querySelector(".country").remove();
        }
        const { official } = data[0].name;
        const { png } = data[0].flags;
        document.querySelector(".flag-icon").innerHTML = '<img src="' + png + '" alt=""></img>';
        document.querySelector(".country").innerText = "Country: " + official;
    },

    degToCompass: function(num){
        var val = Math.floor((num / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        direction = arr[(val % 16)];
        return direction;
    },

    displayWeather: function(data) {
        const { name, dt } = data;
        const { icon, description, main } = data.weather[0];
        const { temp, temp_min, temp_max, pressure, feels_like, humidity } = data.main;
        const { speed, deg } = data.wind;
        date = new Date(dt * 1000);
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".temp").innerText = temp + "°C";
        
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description;

        document.querySelector(".date").innerText = "Date: " + date;
        document.querySelector(".main-weather").innerText = "General: " + main;
        document.querySelector(".temp-min-max").innerText = "Min:  " + temp_min + "°C / Max: " + temp_max + "°C";
        document.querySelector(".feels-like").innerText = "Feels like: " + feels_like + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".pressure").innerText = "Pressure: " + pressure + "mbar";
        document.querySelector(".wind-speed").innerText = "Wind speed: " + speed + "km/h ";
        document.querySelector(".wind-direction").innerText = "Wind Direction: " + deg + "° (" + this.degToCompass(deg) + ")";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

    search: function(){
        cords = document.querySelector(".search-bar").value;
        arr = cords.split(' ');
        this.fetchCords(arr[0], arr[1]);
        this.fetchCountry(document.querySelector(".search-bar").value);
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Geolocation
function getGeolocation(){
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        const crd = pos.coords;
        console.log(crd.latitude);
        console.log(crd.longitude);
        console.log(`More or less ${crd.accuracy} meters accuracy of GPS.`);
        weather.fetchCords(crd.latitude, crd.longitude);
    }
    function error(err) {
        alert(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
};
// 

document.querySelector(".search-button").addEventListener("click", function(){
    weather.search();    
});

document.querySelector(".geo").addEventListener("click", function(){
    getGeolocation();    
});


document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
})

// weather.fetchWeather("Baku");