class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.temperatura = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    // this.feelsLike = document.getElementById('w-feels-like');
    this.koordinate = document.getElementById('w-koordinate');
    this.wind = document.getElementById('w-wind');
    this.izlazSunca = document.getElementById('sunce-izlaz');
    this.zalazSunca = document.getElementById('sunce-zalaz');
    this.datum = document.getElementById('datum');
    this.lista48sati1 = document.getElementById('sedamdana-dani-1');
    this.lista48sati2 = document.getElementById('sedamdana-dani-2');
    this.lista48sati3 = document.getElementById('sedamdana-dani-3');
  }

  popuniDOM(vrijeme) {
    console.log(vrijeme);
    // API openweathermap daje vrijeme u sekundama, JS traži milisekunde
    // console.log('Milisekunde='+ vrijeme.dt, new Date(vrijeme.sys.sunrise  * 1000));
    // console.log('Milisekunde='+ vrijeme.sys.sunrise,new Date(vrijeme.dt  * 1000));
    // console.log('Milisekunde='+ vrijeme.sys.sunset,new Date(vrijeme.sys.sunset  * 1000));

    let markup;
    let dobaDanaIkona;
    this.location.textContent = vrijeme.name;
    this.desc.textContent = vrijeme.weather[0].description;
    this.temperatura.textContent = `${this.pretvorVrijeme(
      new Date().getTime() / 1000
    )}h;    ${vrijeme.main.temp.toFixed()} °C`;

    // oderđujem koje je doba dana da se odabera dnevna/nocna ikona
    if (vrijeme.dt > vrijeme.sys.sunrise && vrijeme.dt < vrijeme.sys.sunset) {
      dobaDanaIkona = 'dan';
    } else {
      dobaDanaIkona = 'noc';
    }

    this.icon.setAttribute(
      'src',
      this.formirajIconu(vrijeme.weather[0].description, dobaDanaIkona)
    );
    markup = `<li class="list-group-item" id="w-humidity"><img src="css/humidity.png" class="ikone">${vrijeme.main.humidity} %</li>`;
    this.details.insertAdjacentHTML('beforebegin', markup);
    markup = `<li class="list-group-item" id="w-wind"><img src="css/wind.png" class="ikone">${vrijeme.wind.speed.toFixed(
      1
    )} m/s</li>`;
    this.details.insertAdjacentHTML('beforebegin', markup);
    markup = `<li class="list-group-item" id="sunce-izlaz"><img src="css/sunrise.png" class="ikone">${this.pretvorVrijeme(
      vrijeme.sys.sunrise
    )}</li>`;
    this.details.insertAdjacentHTML('beforebegin', markup);
    markup = `<li class="list-group-item" id="sunce-zalaz"><img src="css/sunset.png" class="ikone">${this.pretvorVrijeme(
      vrijeme.sys.sunset
    )}</li>`;
    this.details.insertAdjacentHTML('beforebegin', markup);
    this.datum.textContent = `${this.formatirajDatum()}`;
  }

  // popunjava glavni meni vrijeme trenutnim vrijednostima
  popunuDOMsedam(vrijeme) {
    console.log(vrijeme);
    let markup;
    let klasaIkone = '';
    let startnoVrijeme = this.pretvorVrijeme(vrijeme.hourly[0].dt).substr(
      0,
      this.pretvorVrijeme(vrijeme.hourly[0].dt).length - 3
    );
    let doPonoci = 24 - startnoVrijeme;

    // stvara polje od podataka 48 sati
    Array.from(vrijeme.hourly).forEach((data, index) => {
      // definiramo doba dana da možemi uhvatiti ispravnu ikonu
      let dobaDanaIkona = this.dobaDana(index, vrijeme);

      // definira se kolona vrijeme 48 gdje ce se vršiti zapis
      let br = Math.floor(index / 16) + 1;

      // pretvaram dobiveni sat u prikladan format za ispis
      let vrijeme48 = this.pretvorVrijeme(data.dt).substr(
        0,
        this.pretvorVrijeme(data.dt).length - 3
      );

      // popunjavamo vrijeme za svaka 4h ne ekranu
      if (vrijeme48 % 4 !== 0) {
        vrijeme48 = '';
      }

      // formatiram vrijeme ako je npr.9h pretvaram ga u 09h
      if (parseInt(vrijeme48) < 10) {
        vrijeme48 = '0' + vrijeme48;
      }
      // odredujem u kojem sam danu, mijenjam boju fonta u stupcu 7dana
      if (index < doPonoci) {
      } else if (index < doPonoci + 24) {
        klasaIkone = 'sutra';
      } else {
        klasaIkone = 'prekosutra';
      }

      // ovisno o stupcu za 48sat vremena popunjavam DOM
      switch (br) {
        // spremam u kolonu 1
        case 1:
          markup = `<li class="sati48 ${klasaIkone}">${
            vrijeme48 === '' ? '' : vrijeme48 + 'h'
          }<img src="${this.formirajIconu(
            data.weather[0].description,
            dobaDanaIkona
          )}"></li>`;
          this.lista48sati1.insertAdjacentHTML('beforebegin', markup);
          break;

        // spremam u kolonu 2
        case 2:
          markup = `<li class="sati48 ${klasaIkone}">${
            vrijeme48 === '' ? '' : vrijeme48 + 'h'
          }<img src="${this.formirajIconu(
            data.weather[0].description,
            dobaDanaIkona
          )}"></li>`;
          this.lista48sati2.insertAdjacentHTML('beforebegin', markup);
          break;
        // spremam u kolonu 2
        case 3:
          markup = `<li class="sati48 ${klasaIkone}">${
            vrijeme48 === '' ? '' : vrijeme48 + 'h'
          }<img src="${this.formirajIconu(
            data.weather[0].description,
            dobaDanaIkona
          )}"></li>`;
          this.lista48sati3.insertAdjacentHTML('beforebegin', markup);
          break;
      }
    });
  }

  // vračamo link ikone iz CSS direktorija prema opisu iz API
  formirajIconu(vrijeme, dobaDanaIkona) {  
    let day;
    //  https://developer.accuweather.com/sites/default/files/06-s.png
    switch (vrijeme) {
      case 'vedro':
        if (dobaDanaIkona === 'dan') {
          day = 'css/01-s.png';
        } else {
          day = 'css/33-s.png';
        }
        break;
      case 'oblačno':
        if (dobaDanaIkona === 'dan') {
          day = 'css/07-s.png';
        } else {
          day = 'css/38-s.png';
        }
        break;
      case 'raštrkani oblaci':
        if (dobaDanaIkona === 'dan') {
          day = 'css/04-s.png';
        } else {
          day = 'css/34-s.png';
        }
        break;
      case 'kiša':
        if (dobaDanaIkona === 'dan') {
          day = 'css/18-s.png';
        } else {
          day = 'css/40-s.png';
        }
        break;
      case 'blaga naoblaka':
        if (dobaDanaIkona === 'dan') {
          day = 'css/06-s.png';
        } else {
          day = 'css/36-s.png';
        }
        break;
      case 'isprekidani oblaci':
        if (dobaDanaIkona === 'dan') {
          day = 'css/03-s.png';
        } else {
          day = 'css/35-s.png';
        }
        break;
      case 'slaba kiša':
        if (dobaDanaIkona === 'dan') {
          day = 'css/13-s.png';
        } else {
          day = 'css/39-s.png';
        }
        break;
      case 'umjerena kiša':
        if (dobaDanaIkona === 'dan') {
          day = 'css/14-s.png';
        } else {
          day = 'css/39-s.png';
        }
        break;
      case 'sumaglica':
        if (dobaDanaIkona === 'dan') {
          day = 'css/11-s.png';
        } else {
          day = 'css/37-s.png';
        }
      case 'snijeg':
        if (dobaDanaIkona === 'dan') {
          day = 'css/22-s.png';
        } else {
          day = 'css/22-s.png';
        }
        break;
      case 'slabi snijeg':
        if (dobaDanaIkona === 'dan') {
          day = 'css/22-s.png';
        } else {
          day = 'css/22-s.png';
        }
        break;


        // default
        default:
        console.log('nedefiniran:', vrijeme);
    }
    return day;
  }

  // formatiranje datuma za ispis na ekran
  formatirajDatum() {
    let day;
    let danas = new Date();

    let dd = danas.getDate();
    let mm = danas.getMonth() + 1;
    let yyyy = danas.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    danas = mm + '-' + dd + '-' + yyyy; // console.log(danas);
    danas = mm + '/' + dd + '/' + yyyy; // console.log(danas);
    danas = dd + '-' + mm + '-' + yyyy; // console.log(danas);
    danas = dd + '.' + mm + '.' + yyyy; // odabrani format

    switch (new Date().getDay()) {
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
    return day + ', ' + danas;
  }

  // odreduje doba dana da možemo ispisati dnevnu/nočnu ikonu
  dobaDana(index, vrijeme) {
    let izlazSunca;
    let zalazSunca;
    let dobaDana;
    // console.log(vrijeme.hourly[index].weather[0].description);

    // odredujemo datum
    let today = new Date().getDate(); // console.log(today);

    let dan = new Date(vrijeme.hourly[index].dt * 1000).getDate(); // console.log(dan);

    let razlika = dan - today;

    // ako je kraj mjeseca npr.30 a sljedeci dan je 1, dobivamo negtivnu vrijednost i dodajemo trenutni dan
    if (razlika < 0) {
      razlika = razlika + today;
    }

    // definiramo sat kojeg promatramo
    let sat = vrijeme.hourly[index].dt;

    // odredujemo izlazak i zalazalk sunca za dan u kojem se promatra sat (danas, sutra i prekosutra)
    if (razlika === 0) {
      izlazSunca = vrijeme.daily[0].sunrise;
      zalazSunca = vrijeme.daily[0].sunset;
    } else if (razlika === 1) {
      izlazSunca = vrijeme.daily[1].sunrise;
      zalazSunca = vrijeme.daily[1].sunset;
    } else {
      izlazSunca = vrijeme.daily[2].sunrise;
      zalazSunca = vrijeme.daily[2].sunset;
    }

    if (sat > izlazSunca && sat < zalazSunca) {
      // console.log('Izlazak sunca= ' + izlazSunca + ' - ' + dobaDana + ' - ' +vrijeme.hourly[index].dt + '  zalazak= ' +  zalazSunca);
      dobaDana = 'dan';
    } else {
      // console.log('Izlazak sunca= ' + izlazSunca + ' - '+ dobaDana + ' - '+ vrijeme.hourly[index].dt + '  zalazak= ' +  zalazSunca);
      dobaDana = 'noc';
    }
    return dobaDana;
  }

  // Ispisuje upozirenje na ekram ako je Input prazan
  upozorenje(msg, className) {
    // kreiraj element
    let div = document.createElement('div');

    // dodaj klasu
    div.className = `col-md-6 mx-auto text-center alert ${className} mt-3`;

    // dodaj text
    div.appendChild(document.createTextNode(msg));

    // Get parent
    let container = document.querySelector('.container');

    // selektiraj formu ispred koje češ ga ubaciti
    let form = document.querySelector('.trenutno');

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

  // pretvaranje vremena u zapis prikladan za ispis na ekran
  pretvorVrijeme(data) {
    let unix_timestamp = data;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);

    // Hours part from the timestamp
    let hours = date.getHours();

    // Minutes part from the timestamp
    let minutes = '0' + date.getMinutes();

    // Seconds part from the timestamp
    let seconds = '0' + date.getSeconds();

    // Will display time in 10:30:23 format
    // let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let formattedTime = hours + ':' + minutes.substr(-2); // console.log('Formatirano vrijeme= '+ formattedTime);

    return formattedTime;
  }

  // brisanje postojećih podataka sa ekrana
  ocistiEkran() {
    // ako su polja 48 h puna , brišem ih da se mogu ubaciti novi podaci
    // prilikom prvog usnimavanja polje je prazno ta preskače ovaj dio
    if (document.querySelectorAll('.sati48').length > 0) {
      document.querySelectorAll('.sati48').forEach((e) => {
        e.remove();
      });

      // kako nije prvo učitavanje , brišem postojeće detalje sa ekrana
      document.querySelectorAll('.list-group-item').forEach((e) => {
        e.remove();
      });
    }
  }
}
