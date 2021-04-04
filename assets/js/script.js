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
            // console.log(weatherData.current.temp)
            // var locationIconEl = document.querySelector('location-icon');
            // var getlocationIcon = document.createElement('svg');

            var windSpeedEl = document.querySelector('#wind-speed');
            var uvEl = document.querySelector('#uv');


            windSpeedEl.innerHTML = weatherData.current.wind_speed + "MPH";
            uvEl.innerHTML = " " + weatherData.current.uvi + " ";

            for (var i = 0; i < 6; i++) {
                var unixTime = new Date(weatherData.daily[i].dt * 1000);
                // console.log(unixTime);
                var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = unixTime.getFullYear();
                var month = months_arr[unixTime.getMonth()];
                var day = unixTime.getDate();
                var convdataTime = month+'-'+day+'-'+year;
                // console.log(convdataTime);

                var dateEl = document.querySelector('#date-' + i +'');
                dateEl.innerHTML =  convdataTime;

                var temperatureEl = document.querySelector('#temperature-' + i + '');
                var humidityEl = document.querySelector('#humidity-' + i +'')
                var weatherIconEl = document.querySelector('#weather-icon-' + i + '');

                console.log(weatherIconEl);
                console.log(weatherData.daily[i].weather[0].icon)


                temperatureEl.innerHTML = weatherData.daily[i].temp.max + "°F";
                humidityEl.innerHTML = weatherData.daily[i].humidity +"%";
                var icon = weatherData.daily[i].weather[0].icon 
                console.log(icon);

                weatherIconEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;


            };

            
            
        });
    });

};