class Access {
  constructor() {
    this._value = 5;
  }

  get value2() {
    return this._value * 2;
  }

  addToValue() {
    return this.value2 + 2;
  }
}

const newClass = new Access();

console.log(newClass.value2);
newClass.value2 = 5;
console.log(newClass);
