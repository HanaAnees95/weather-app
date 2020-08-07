let inputCity = document.getElementById('city');
let btn = document.getElementById('search');

btn.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputCity.value+'&appid=0365b4fa4728e64b93853626a699433c')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let weather = ''
        weather += '<h4 id="city">Weather Forecast for '+data['name']+'</h4><hr>';
        weather += '<p class="weather-description">City ID : '+data['id']+'<br>';
        weather += 'Temperature : '+Math.trunc(data['main']['temp'] - 273.15)+'&#176;C';
        weather += '<br>Humidity : '+data['main']['humidity']+'%<br>';
        weather += 'Wind Speed : '+data['wind']['speed']+'km/h<br>';
        weather += 'Forecast : '+data['weather'][0]['description']+'</p><br><hr>';

        document.getElementById('weatherForecast').innerHTML = weather;

    })
})