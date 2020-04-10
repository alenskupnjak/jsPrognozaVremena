class Vrijeme {
  constructor(grad, drzava){
    this.apiKey = 'c6ce8e54cb1a45e8a46e0c7c9e327d8d';
    this.grad = grad;
    this.drzava = drzava;
  }

  // Pokupi vrijeme sa API openweathermap 1000 poziva /dnevno
  async getVrijeme () {
    URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.grad},${this.drzava}&appid=c6ce8e54cb1a45e8a46e0c7c9e327d8d`;
    const response =  await fetch(URL);
    const responseData = await response.json();
    return responseData;
  }

  // Promjeni lokaciju grada
  promjeniLokaciju(grad, drzava) {
    this.grad = grad;
    this.drzava = drzava;
  }

}