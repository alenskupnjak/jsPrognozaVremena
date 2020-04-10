// Init local storage
const locStorage = new Storage();
const vrijemeLokacije = locStorage.getLocationData();

// Init Vrijeme class
const vrijeme = new Vrijeme(vrijemeLokacije.grad, vrijemeLokacije.drzava);
// Init DOM
const ui = new UI();

// pokupi podatke vremena iz DOM prilikom refresh
document.addEventListener('DOMContentLoaded', dohvatiVrijeme);

// prognoza za 7 dana
document.getElementById('sedamDana').addEventListener('click', (e) => {

  vrijeme.sedamDana(45.83, 16.12);

// lon: 16.12 sesvete
// lat: 45.83


});

// Promjeni lokaciju
document.getElementById('w-change-btn').addEventListener('click', (e)=> {
  const grad = document.getElementById('city').value;
  const drzava = document.getElementById('state').value;
 console.log('grad ='  + grad );
 console.log('drzava= ' + drzava );
 
  if(grad !== '' && drzava !=='') {
    console.log('hej');
    
    // promjeni lokaciju grada
    vrijeme.promjeniLokaciju(grad, drzava);
  
    // promjeni local storage
    locStorage.setLocationData(grad,drzava)
  
    // dohvati vremenske podatke
    dohvatiVrijeme();
  
    // zatvori modal
    $('#locModal').modal('hide');
  } else {
    ui.upozorenje('Jedno je polje prazno', 'alert-danger');
  }
})


/// dohvati vremenske podatke
function dohvatiVrijeme(){
  vrijeme.getVrijeme()
    .then((data) => {
      console.log(data);
      if (data !== 'nemaGrada'){
        ui.popuniDOM(data);
      } else {
        ui.upozorenje('Nisam pronašao grad!', 'alert-danger');
        locStorage.setLocationData('Sesvete','HR')
      }
    })
    .catch((err) => console.log(err));
}
