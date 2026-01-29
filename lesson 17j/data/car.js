class Car {
  #brand;
  #model;
  speed = 0;
  #isTruckOpen = false;
  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
  }
  displayInfo() {
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Truck: ${this.#isTruckOpen ? "open" : "false"}`,
    );
  }
  go() {
    if (this.#isTruckOpen) return;
    if (this.speed > 200) this.speed = 200;
    this.speed += 5;
  }
  brake() {
    if (this.speed === 0) return;
    this.speed -= 5;
  }
  openTruck() {
    if (this.speed === 0) this.#isTruckOpen = true;
  }
  closeTruck() {
    this.#isTruckOpen = false;
  }
}

class RaceCar extends Car {
  accelaration;
  constructor(brand, model, accelaration) {
    super(brand, model);
    this.accelaration = accelaration;
  }
  go() {
    if (this.speed > 300) this.speed = 300;
    this.speed += this.accelaration;
  }
  openTrunk() {
    console.log("Race cars do not have a trunk.");
  }
  closeTruck() {
    console.log("Race cars do not have a trunk.");
  }
}

const car1 = new Car("Toyota", "Corolla");
console.log(car1);
const car2 = new Car("Tesla", "Model 3");
car1.openTruck();
car1.go();
car1.openTruck();
car1.displayInfo();
car2.displayInfo();

const mclaren = new RaceCar("McLaren", "F1", 20);
mclaren.go();
mclaren.displayInfo();
console.log(mclaren);
