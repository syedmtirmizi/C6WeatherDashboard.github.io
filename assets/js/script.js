function locationSearch() {
    var location = document.querySelector('#locationSearch').value;

    console.log(location);


    fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + ',+CA&key=AIzaSyA82N89_lZedGe8xCtJpiMTHhzvptY84WA'
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(longlat) {
        console.log(longlat);
        // console.log(longlat.results[0].geometry.location.lat);
        // console.log(longlat.results[0].geometry.location.lng);
        var locationNameEl = document.querySelector('#location-name');
        locationNameEl.innerHTML = longlat.results[0].formatted_address;
        fetch(
            'https://api.openweathermap.org/data/2.5/onecall?lat=' + longlat.results[0].geometry.location.lat + '&lon=' + longlat.results[0].geometry.location.lng + '&units=imperial&appid=3e8bb110d4d1c85002a6e196509f6d45'
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(weatherData) {
            console.log(weatherData);
            console.log(weatherData.current.temp)
            // var locationIconEl = document.querySelector('location-icon');
            // var getlocationIcon = document.createElement('svg');
            var temperatureEl = document.querySelector('#temperature');
            var humidityEl = document.querySelector('#humidity');
            var windSpeedEl = document.querySelector('#wind-speed');
            var uvEl = document.querySelector('#uv');
            // locationIconEl.innerHTML = "";
            // getlocationIcon.setAttribute('src', weatherData.current.weather[0].icon);
            // locationIconEl.appendChild(getlocationIcon);
            temperatureEl.innerHTML = weatherData.current.temp + "°F";
            humidityEl.innerHTML = weatherData.current.humidity +"%";
            windSpeedEl.innerHTML = weatherData.current.wind_speed + "MPH";
            uvEl.innerHTML = " " + weatherData.current.uvi + " ";

            var date1El = document.querySelector('#date-1');
            var weatherIcon1 = document.querySelector('#weather-icon-1');
            var temperature1El = document.querySelector('#temperature-1');
            var humidity1El = document.querySelector('#humidity-1')

            var unixTime1 = Date(weatherData.daily[1].dt * 1000);
            console.log(unixTime1);
            var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = unixTime1.getFullYear();
            var month = months_arr[unixTime1.getMonth()];
            var day = unixTime1.getDate();
            var convdataTime = month+'-'+day+'-'+year;
            console.log(convdataTime);






            
            temperature1El.innerHTML = weatherData.daily[1].temp.max + "°F";
            humidity1El.innerHTML = weatherData.daily[1].humidity + "%";

            
            
        });
    });

};