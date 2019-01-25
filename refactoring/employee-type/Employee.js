class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }

  toString() {
    return this._value;
  }
}

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!['engineer', 'manager', 'salesman'].includes(arg)) throw new Error(`Employee cannot be of type${arg}`);
  }

  get typeString() {
    return this._type.toString();
  }

  get type() {
    return this._type;
  }

  set type(arg) {
    this._type = Employee.createEmployeeType(arg);
  }

  static createEmployeeType(aString) {
    switch (aString) {
      case 'engineer':
        return new Engineer();
      case 'manager':
        return new Manager();
      case 'salesman':
        return new Salesman();
      default:
        throw new Error(`Employee cannot be of type ${aString}`);
    }
  }

  get capitalizedType() {
    return this.typeString.charAt(0).to8pperCase() + this.typeString.substr(1).toLowerCase();
  }

  toString() {
    return `${this._name}(${this.capitalizedType})`;
  }
}
