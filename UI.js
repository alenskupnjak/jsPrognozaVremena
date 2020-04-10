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
    
    // this.icon.setAttribute('src',`https://openweathermap.org/img/wn/${vrijeme.weather[0].icon}@2x.png`);
    this.icon.setAttribute('src', this.formirajIconu(vrijeme.weather[0].description));
    this.humidity.textContent = `Relativna vlažnost: ${vrijeme.main.humidity}%`;
    this.feelsLike.textContent = `Vrijeme: ${vrijeme.weather[0].description}`;
    this.koordinate.textContent = `Koordinate: lon. ${vrijeme.coord.lon} lat. ${vrijeme.coord.lat}`;
    this.wind.textContent = `Brzina vjetra: ${vrijeme.wind.speed} m/s`;
  }

  formirajIconu (vrijeme){
   console.log(vrijeme);
      let day;
     //  https://developer.accuweather.com/sites/default/files/06-s.png
// https://www.accuweather.com/images/weathericons/7.svg
    switch(vrijeme){
      case 'vedro':
        day = 'css/1.svg';
        break;
      case 'oblačno':
        day = 'css/7.svg';
        break;
      case 'raštrkani oblaci':
        day = 'css/4.svg';
        break;
      case 'kiša':
        day = 'css/18-s.png';
        break;
      case 'blaga naoblaka':
        day = 'css/06-s.png';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
    }
    console.log(day);
    return day
  }

   formatirajDatum() {
    let danas = new Date();
    let dd = danas.getDate();
    let mm = danas.getMonth() + 1; 
    let yyyy = danas.getFullYear();
    if(dd < 10) 
    {
        dd='0'+dd;
    } 

    if(mm < 10) 
    {
        mm='0'+mm;
    } 
    danas= mm+'-'+dd+'-'+yyyy;
    console.log(danas);
    danas= mm+'/'+dd+'/'+yyyy;
    console.log(danas);
    danas= dd+'-'+mm+'-'+yyyy;
    console.log(danas);
    danas= dd+'/'+mm+'/'+yyyy;
    console.log(danas);
    return danas
  }


  upozorenje(msg, className) {
    console.log('upozorenje');

      let div = document.createElement('div');
      // Add class
      div.className = `col-md-6 mx-auto text-center alert ${className} mt-3`;
      // Add text
      div.appendChild(document.createTextNode(msg));
      //Get parent
      let container = document.querySelector('.container');
  
      let form = document.querySelector('.row');
  
      // Ubaci upozorenje
      container.insertBefore(div, form);
  
      // Isključi nakon 3 sekunde
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);


      div = document.createElement('div');
      // Add class
      div.className = `col-md-6 mx-auto text-center alert ${className} mt-2`;
      // Add text
      div.appendChild(document.createTextNode(msg));
      //Get parent
      container = document.querySelector('.modal-content');
  
      form = document.querySelector('.modal-header');
  
      // Ubaci upozorenje
      container.insertBefore(div, form);
  
      // Isključi nakon 3 sekunde
      setTimeout(function () {
        document.querySelector('.alert').remove();
      }, 3000);




  }



}