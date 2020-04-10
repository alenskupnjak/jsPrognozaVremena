class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.temperatura = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.koordinate= document.getElementById('w-koordinate');
    this.wind = document.getElementById('w-wind');
  }

  popuniDOM(vrijeme) {    
    this.location.textContent = vrijeme.name;
    this.desc.textContent = vrijeme.weather[0].description;
    let celzius = (vrijeme.main.temp - 273.15).toFixed();
    this.temperatura.textContent = `Temperatura: ${celzius} °C`;

    // let URL = `openweathermap.org/img/wn/03n@2x.png`
    // let URL = `https://openweathermap.org/img/wn/${vrijeme.weather[0].icon}@2x.png`
    
    this.icon.setAttribute('src',`https://openweathermap.org/img/wn/${vrijeme.weather[0].icon}@2x.png`);
    this.humidity.textContent = `Relativna vlažnost: ${vrijeme.main.humidity}%`;
    this.feelsLike.textContent = `Vrijeme: ${vrijeme.weather[0].description}`;
    this.koordinate.textContent = `Koordinate: lon. ${vrijeme.coord.lon} lat. ${vrijeme.coord.lat}`;
    this.wind.textContent = `Brzina vjetra: ${vrijeme.wind.speed} m/s`;
  }
}