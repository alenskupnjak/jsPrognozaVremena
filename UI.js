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
    this.izlazSunca = document.getElementById('sunce-izlaz');
    this.zalazSunca = document.getElementById('sunce-zalaz');
    this.datum = document.getElementById('datum');
  }

  popuniDOM(vrijeme) {   
    this.pretvorVrijeme(vrijeme.sys.sunrise);
    this.pretvorVrijeme(vrijeme.sys.sunset);
    console.log(vrijeme.sys.sunrise);
    console.log('Zalaz sunca='+ vrijeme.sys.sunset);
    
    this.location.textContent = vrijeme.name;
    this.desc.textContent = vrijeme.weather[0].description;
    // let celzius = (vrijeme.main.temp - 273.15).toFixed();
    this.temperatura.textContent = `Trenutno: ${vrijeme.main.temp.toFixed()} °C`;

    // let URL = `openweathermap.org/img/wn/03n@2x.png`
    // let URL = `https://openweathermap.org/img/wn/${vrijeme.weather[0].icon}@2x.png`
    
    // this.icon.setAttribute('src',`https://openweathermap.org/img/wn/${vrijeme.weather[0].icon}@2x.png`);
    this.icon.setAttribute('src', this.formirajIconu(vrijeme.weather[0].description));
    this.humidity.textContent = `Relativna vlažnost: ${vrijeme.main.humidity}%`;
    this.feelsLike.textContent = `Vrijeme: ${vrijeme.weather[0].description}`;
    this.koordinate.textContent = `Koordinate: lon. ${vrijeme.coord.lon} lat. ${vrijeme.coord.lat}`;
    this.wind.textContent = `Brzina vjetra: ${vrijeme.wind.speed} m/s`;
    this.izlazSunca.textContent = 'Izlazak sunca: '+this.pretvorVrijeme(vrijeme.sys.sunrise);
    this.zalazSunca.textContent = 'Zalazak sunca: '+this.pretvorVrijeme(vrijeme.sys.sunset);
    this.datum.textContent= `${this.formatirajDatum()}`;
  }

  formirajIconu (vrijeme){
   console.log(vrijeme);
      let day;
     //  https://developer.accuweather.com/sites/default/files/06-s.png
    switch(vrijeme){
      case 'vedro':
        day = 'css/01-s.png';
        break;
      case 'oblačno':
        day = 'css/7-s.png';
        break;
      case 'raštrkani oblaci':
        day = 'css/04-s.png';
        break;
      case 'kiša':
        day = 'css/18-s.png';
        break;
      case 'blaga naoblaka':
        day = 'css/06-s.png';
        break;
      case 'isprekidani oblaci':
        day = 'css/03-s.png';
        break;
      case 6:
        day = 'Saturday';
        break;
    }
    console.log(day);
    return day
  }

   formatirajDatum() {
    let day;
    let danas = new Date();
    console.log(danas);
    
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
    // danas= dd+'-'+mm+'-'+yyyy;
    console.log(danas);
    danas= dd+'.'+mm+'.'+ yyyy
    console.log(danas);

    switch(new Date().getDay()){
      case 0:
        day = 'Nedelja';
        break;
      case 1:
        day = 'Ponedeljak';
        break;
      case 2:
        day = 'Utorak';
        break;
      case 3:
        day = 'Srijeda';
        break;
      case 4:
        day = 'Četvrtak';
        break;
      case 5:
        day = 'Petak';
        break;
      case 6:
        day = 'Subota';
        break;
    }
    return day + ', '+ danas
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

  pretvorVrijeme(data) {
    let unix_timestamp = data
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    console.log('date='+ date);

    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    console.log('Formatirano vrijeme= '+formattedTime);
    return formattedTime
  }




}