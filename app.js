// Init Vrijeme class
const vrijeme = new Vrijeme('zagreb', 'HR');
// Init DOM
const ui = new UI;


// pokupi podatke vremena iz DOM prilikom refresh
document.addEventListener('DOMContentLoaded', getVrijeme);
// vrijeme.promjeniLokaciju('zagreb', 'HR');


function getVrijeme(){

  vrijeme.getVrijeme()
    .then((data) => {
      console.log(data);
     ui.popuniDOM(data);
    })
    .catch((err) => console.log(err));

}
