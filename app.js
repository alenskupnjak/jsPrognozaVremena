// Init local storage
const locStorage = new Storage();
const vrijemeLokacije = locStorage.getLocationData();

// Init Vrijeme class
const vrijeme = new Vrijeme(vrijemeLokacije.grad, vrijemeLokacije.drzava);

// Init DOM
const ui = new UI();

// pokupi podatke vremena iz DOM prilikom refresh
document.addEventListener('DOMContentLoaded', dohvatiVrijeme);

// Promjeni lokaciju
document.getElementById('w-change-btn').addEventListener('click', (e) => {
  // očitavam vrijednosti grada i države sa ekrana
  const grad = document.getElementById('city').value;
  const drzava = document.getElementById('state').value;

  // provjera dali je jedno polje prazno. Ako je daje upozorenje i čeka novi upis
  if (grad !== '' && drzava !== '') {
    // promjeni lokaciju grada
    vrijeme.promjeniLokaciju(grad, drzava);

    // promjeni local storage
    locStorage.setLocationData(grad, drzava);

    // dohvati vremenske podatke
    dohvatiVrijeme();

    // zatvori modal
    $('#locModal').modal('hide');
  } else {
    ui.upozorenje('Jedno je polje prazno', 'alert-danger');
  }
});

// dohvati vremenske podatke
function dohvatiVrijeme() {
  vrijeme
    .getVrijeme()
    .then((data) => {
      if (data !== 'nemaGrada') {
        // počisti UI
        ui.ocistiEkran();

        // popunjavam prvo podatke trenutnog vremena na lijevoj strani Ekrana
        ui.popuniDOM(data);

        vrijeme
          .sedamDana(data.coord.lat, data.coord.lon)
          .then((data) => {
            // popuni 48 sati vrijeme
            ui.popunuDOMsedam(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        ui.upozorenje('Nisam pronašao grad!', 'alert-danger');
        locStorage.setLocationData('Sesvete', 'HR');
      }
    })
    .catch((err) => console.log(err));
}
