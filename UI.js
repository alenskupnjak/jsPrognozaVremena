class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.temperatura = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    // this.feelsLike = document.getElementById('w-feels-like');
    this.koordinate= document.getElementById('w-koordinate');
    this.wind = document.getElementById('w-wind');
    this.izlazSunca = document.getElementById('sunce-izlaz');
    this.zalazSunca = document.getElementById('sunce-zalaz');
    this.datum = document.getElementById('datum');
    this.lista48sati1 = document.getElementById('sedamdana-dani-1');
    this.lista48sati2 = document.getElementById('sedamdana-dani-2');
    this.lista48sati3 = document.getElementById('sedamdana-dani-3');
  }

  popuniDOM(vrijeme) {    
    let markup;   
    this.location.textContent = vrijeme.name;
    this.desc.textContent = vrijeme.weather[0].description;
    // let celzius = (vrijeme.main.temp - 273.15).toFixed();
    this.temperatura.textContent = `${this.pretvorVrijeme((new Date().getTime())/1000)}h;    ${vrijeme.main.temp.toFixed()} °C`;


    
    // let URL = `openweathermap.org/img/wn/03n@2x.png`
    // let URL = `https://openweathermap.org/img/wn/${vrijeme.weather[0].icon}@2x.png`
    
    // this.icon.setAttribute('src',`https://openweathermap.org/img/wn/${vrijeme.weather[0].icon}@2x.png`);
    this.icon.setAttribute('src', this.formirajIconu(vrijeme.weather[0].description));
    // this.humidity.textContent = `Relativna vlažnost: ${vrijeme.main.humidity}%`;
    // this.humidity.innerHTML=`<li class="list-group-item" id="w-humidity"><img src="css/humidity.png" class="ikone">${vrijeme.main.humidity} %</li>`
    markup =`<li class="list-group-item" id="w-humidity"><img src="css/humidity.png" class="ikone">${vrijeme.main.humidity} %</li>`
    this.details.insertAdjacentHTML("beforebegin",markup)
    // this.feelsLike.textContent = `Vrijeme: ${vrijeme.weather[0].description}`;
    // this.koordinate.textContent = `Koordinate: lon. ${vrijeme.coord.lon} lat. ${vrijeme.coord.lat}`;
    // this.wind.textContent = `Brzina vjetra: ${vrijeme.wind.speed} m/s`;
    // this.wind.remove();
    markup  =`<li class="list-group-item" id="w-wind"><img src="css/wind.png" class="ikone">${(vrijeme.wind.speed).toFixed(1)} m/s</li>`
    this.details.insertAdjacentHTML("beforebegin",markup)
    // this.izlazSunca.textContent = 'Izlazak sunca: '+ this.pretvorVrijeme(vrijeme.sys.sunrise);
    markup = `<li class="list-group-item" id="sunce-izlaz"><img src="css/sunrise.png" class="ikone">${this.pretvorVrijeme(vrijeme.sys.sunrise)}</li>`
    this.details.insertAdjacentHTML("beforebegin",markup)
    // this.zalazSunca.textContent = this.pretvorVrijeme(vrijeme.sys.sunset);
    markup =`<li class="list-group-item" id="sunce-zalaz"><img src="css/sunset.png" class="ikone">${this.pretvorVrijeme(vrijeme.sys.sunset)}</li>`
    this.details.insertAdjacentHTML("beforebegin",markup)
    this.datum.textContent= `${this.formatirajDatum()}`;
  }

  popunuDOMsedam(vrijeme) {
    console.log(vrijeme);
    
    let markup;   
    let sata48 = Array.from(vrijeme.hourly).forEach((data, index)=>{
      let br= Math.floor(index/16)+1
      // console.log(data.hourly[index].dt);
      // console.log(data);
      
      // console.log(data.dt);
      // console.log(data.weather[0].description);
      // console.log(this.pretvorVrijeme(data.dt));
      // let tmp = this.pretvorVrijeme(data.dt);
      // console.log(tmp);
      // tmp = tmp.substr(0,tmp.length -3)
      // console.log(tmp);

      // if( parseInt(tmp) < 10) {
      //   console.log('Manji sam od 10  ' + tmp);
      //   tmp = "0" + tmp
      //   console.log(tmp);
      // }

      let vrijeme48 = this.pretvorVrijeme(data.dt).substr(0,this.pretvorVrijeme(data.dt).length -3)

      // formatiram vrijemje ako je npr.9h pretvaram ga u 09h
       if(parseInt(vrijeme48) < 10) {
         vrijeme48 = "0" + vrijeme48
       }
      
      
      // console.log(typeof(this.pretvorVrijeme(data.dt)));

      
      switch(br){
        case 1:
          markup =`<li class="sati48">${vrijeme48}<img src="${this.formirajIconu(data.weather[0].description)}"></li>`
          this.lista48sati1.insertAdjacentHTML("beforebegin",markup)
          break;
        case 2:
          markup =`<li class="sati48">${vrijeme48}<img src="${this.formirajIconu(data.weather[0].description)}"></li>`
          this.lista48sati2.insertAdjacentHTML("beforebegin",markup)
          break;
        case 3:
          markup =`<li class="sati48">${vrijeme48}<img src="${this.formirajIconu(data.weather[0].description)}"></li>`
          this.lista48sati3.insertAdjacentHTML("beforebegin",markup)
          break;
      }
      
      // console.log(index, this.pretvorVrijeme(data.dt), data.weather[0].description);
    });
    

  }

  // vračamo link ikone iz CSS direktorija prema opisu iu API
  formirajIconu (vrijeme){
    // console.log('formirajIconu= ' + vrijeme);
    
      let day;
     //  https://developer.accuweather.com/sites/default/files/06-s.png
    switch(vrijeme){
      case 'vedro':
        day = 'css/01-s.png';
        break;
      case 'oblačno':
        day = 'css/07-s.png';
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
      case 'slaba kiša':
        day = 'css/13-s.png';
        break;
    }
    return day
  }

   formatirajDatum() {
    let day;
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
    // console.log(danas);
    danas= mm+'/'+dd+'/'+yyyy;
    // console.log(danas);
    // danas= dd+'-'+mm+'-'+yyyy;
    // console.log(danas);
    danas= dd+'.'+mm+'.'+ yyyy
    // console.log(danas);

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

    // Hours part from the timestamp
    let hours = date.getHours();

    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // console.log(minutes );
    
    // console.log('Minute= '+ minutes );

    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();
    // console.log(seconds);
    
    // console.log('Sekunde= '+ seconds);
    
    // Will display time in 10:30:23 format
    // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let formattedTime = hours + ':' + minutes.substr(-2)
    // console.log('Formatirano vrijeme= '+ formattedTime);
    
    return formattedTime
  }

  ocistiEkran(){

    // ako su polja 48 h puna , brišem ih da se mogu ubaciti novi podaci
    // prilikom prvog usnimavanja polje je prazno ta preskače ovaj dio
    if(document.querySelectorAll('.sati48').length > 0) {
      document.querySelectorAll('.sati48').forEach( e => {
        e.remove();
      })

      // kako nije prvo učitavanje , brišem postojeće detalje sa ekrana
      document.querySelectorAll('.list-group-item').forEach( e => {
       e.remove();  
      })
    }
  }

}