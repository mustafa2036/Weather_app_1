// https://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=2053b4dd305fffb726718b1c0c05cbfb

let weather = {
    apiKey: '2053b4dd305fffb726718b1c0c05cbfb',
    fetchWeather: function (city) { 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${city}&units=metric&appid=${this.apiKey}`
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) { 
        const { name } = data;
        const { icon , description } = data.weather[0]; // description
        const { temp ,  humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = `Weather in ${name}`
        document.querySelector(".temp").innerText = `${temp} °C`
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".description").innerText = `${description}`;
        document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind Speed: ${speed} km/h`
        document.querySelector(".weather").classList.remove('loading');
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    search: function () { 
        this.fetchWeather(document.querySelector('.search-bar').value)
    },
};

document.querySelector('.search button').addEventListener('click', function(){
    weather.search();
})

document.querySelector('.search-bar').addEventListener('keyup', function (event) { 
    if(event.key == 'Enter'){
        weather.search();
    }
});

$(document).ready(function () {
    $('.sk-chase').fadeOut(2000, () => {
        $('#loading').fadeOut(2200);
    })
});

