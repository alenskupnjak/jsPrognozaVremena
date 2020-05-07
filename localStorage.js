class Storage {
  constructor() {
    this.grad;
    this.drzava;
    this.defaultGrad = 'Sesvete';
    this.defaultDrzava = 'HR';
  }

  getLocationData() {
    if (localStorage.getItem('grad') === null) {
      this.grad = this.defaultGrad;
      this.drzava = this.defaultDrzava;
    } else {
      this.grad = localStorage.getItem('grad');
      this.drzava = localStorage.getItem('drzava');
    }

    return {
      grad: this.grad,
      drzava: this.drzava,
    };
  }

  setLocationData(grad, drzava) {
    localStorage.setItem('grad', grad);
    localStorage.setItem('drzava', drzava);
  }
}
