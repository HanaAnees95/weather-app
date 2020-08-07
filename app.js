"use strict"; // code should be used in strict mode

// document.body.onload = fetchWeather;

let cityCodes = [];
var cities;
var weatherData = [];
var API_URL = '';

fetch("./cities.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        for (let i = 0; i < data.List.length; i++) {
            cityCodes.push(data.List[i].CityCode);
        }
        cities = cityCodes.join();
        API_URL = 'https://api.openweathermap.org/data/2.5/group?id=' + cities + '&appid=0365b4fa4728e64b93853626a699433c'
        // console.log(API_URL);

        fetch(API_URL)
            .then(response => response.json())
            .then(function (data) {
                weatherData = [...data.list];
                // console.log(API_URL);

                var htmlCard = '';
                for (let c = 0; c < weatherData.length; c++) {

                    let cityId = weatherData[c]['id'];
                    let cityName = weatherData[c]['name'];
                    let cityWeather = weatherData[c]['weather'][0]['description'];
                    let cityTemp = Math.trunc(weatherData[c]['main']['temp'] - 273.15);
                    
                    htmlCard = htmlCard + '<div class="card border-dark bg-light mb-3">';
                    htmlCard += '<img src="/img/'+cityName+'.jpg" class="card-img-top" alt="Weather Detail Card">';
                    htmlCard += '<div class="card-body">';
                    // htmlCard += '<p class="card-text">City ID: '+cityId+'</p>';
                    htmlCard += '<h4 class="card-title">'+cityName+'</h4>';
                    htmlCard += '<h4 class="card-title">'+cityTemp+'&#176;C</h4>';
                    htmlCard += '<div class="row">';
                    htmlCard += '<div class="col-sm-8">';
                    htmlCard += '<p class="card-text weather-description">'+cityWeather+'</p>';
                    htmlCard += '</div>';
                    htmlCard += '</div>';
                    htmlCard += '</div>';
                    htmlCard += '</div>';

                    document.getElementById('weatherCards').innerHTML = htmlCard;
                }
            })

            .catch(err => ("The requested data is not available at the moment."))       
    });

