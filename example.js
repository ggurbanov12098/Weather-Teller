let weather = {
    apiKey: "50697639d130e6a0f1a08e4c6825c5f0",
    fetchCords: function(lat, lon){
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.geolocationToCCA2(data));
    },
    geolocationToCCA2: function(data){
        const { country } = data.sys;
        console.log(country);
        fetch("https://restcountries.com/v3.1/alpha/" + country + "")
            .then((response) => response.json())
            .then((data) => this.geolocationToCountry(data));
    },
    geolocationToCountry: function(data){
        const {status} = data;
        if(status == 404){
            document.querySelector(".text").remove();
        } else {
            const { png } = data[0].flags;
            const { official } = data[0].name;
            document.querySelector(".text").innerHTML = '<img src="' + png + '" alt=""></img>';
            document.querySelector(".official").innerText = "Country: " + official;
        }
    }
};

