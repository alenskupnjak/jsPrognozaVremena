class Vrijeme {
  constructor(grad, drzava) {
    this.apiKey = 'c6ce8e54cb1a45e8a46e0c7c9e327d8d';
    this.grad = grad;
    this.drzava = drzava;
  }

  // Pokupi vrijeme sa API openweathermap 1000 poziva /dnevno
  async getVrijeme() {
    try {
      URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.grad},${this.drzava}&lang=hr&units=metric&appid=c6ce8e54cb1a45e8a46e0c7c9e327d8d`;
      const response = await fetch(URL);
      const responseData = await response.json();
      if (responseData.cod === '404') {
        return 'nemaGrada';
      }

      return responseData;
    } catch (err) {
      console.log(err);
    }
  }

  // Prognoza vremena za 7 dana
  async sedamDana(lat, lon) {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=hr&units=metric&appid=c6ce8e54cb1a45e8a46e0c7c9e327d8d`;
    const response = await fetch(URL);
    const responseData = await response.json();
    console.log(responseData);

    return responseData;
  }

  // Promjeni lokaciju grada
  promjeniLokaciju(grad, drzava) {
    this.grad = grad;
    this.drzava = drzava;
  }
}
